package pt.com.deimos.vcwapi.service;

import io.minio.errors.MinioException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import pt.com.deimos.vcwapi.dto.ProjectDTO;
import pt.com.deimos.vcwapi.dto.ProjectHasUserRoleDTO;
import pt.com.deimos.vcwapi.entity.FileEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.entity.ProjectHasUserRoleEntity;
import pt.com.deimos.vcwapi.exceptions.BadRequestException;
import pt.com.deimos.vcwapi.exceptions.InternalErrorException;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.repository.ProjectRepository;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Transactional
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Autowired
    private MinioService minioService;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Iterable<ProjectEntity> findAll() throws MinioException {
        return this.projectRepository.findAll();
    }

    public Optional<ProjectEntity> findById(Long id) throws MinioException {

        Optional<ProjectEntity> result = this.projectRepository.findById(id);

        if (result.isEmpty())
            throw new NotFoundException("Project does not exist.");

        return result;
    }

    public Iterable<ProjectEntity> findByUser(String userId) throws MinioException {
        return this.projectRepository.findByProjectHasUserRoleEntitiesUserInum(userId);
    }

    public Optional<ProjectEntity> findByIdAndUser(Long id, String userId) {

        Optional<ProjectEntity> result = this.projectRepository.findByIdAndProjectHasUserRoleEntitiesUserInum(id, userId);

        if (result.isEmpty())
            throw new NotFoundException("Project does not exist.");

        return result;
    }

    public ProjectEntity save(ProjectDTO projectInfo, MultipartFile thumbnail, String userId) {

        ProjectEntity newProject = new ProjectEntity(userId, userId,
                projectInfo.getName(), projectInfo.getDescription(),
                projectInfo.getLang());

        // save user as project owner to not lose access
        for (ProjectHasUserRoleDTO user : projectInfo.getProjectUsers()) {
            //ProjectHasUserRoleEntity userRole = new ProjectHasUserRoleEntity(
            //        userId, userId, user.getRoleId(), user.getUserId());
            //userRole.setProject(newProject);
            //newProject.addProjectHasUserRole(userRole);
        }

        newProject = this.projectRepository.save(newProject);
        if (newProject == null ) {
            throw new BadRequestException("Failed to save project.");
        }


        return newProject;
    }

    public void delete(ProjectEntity projectEntity) {
        this.projectRepository.delete(projectEntity);
    }


    // Thumbnails

    public FileEntity getThumbnail(ProjectEntity project) {

        FileEntity thumbnail = project.getFileThumbnail();
        if (thumbnail == null)
            throw new NotFoundException("Thumbnail does not exist.");

        //generate image url
        FileEntity tempThumbnail = null;
        try {
            tempThumbnail = new FileEntity();
            BeanUtils.copyProperties(thumbnail, tempThumbnail);
            String url = this.minioService.getDownloadUrl(tempThumbnail.getPath());
            tempThumbnail.setPath(url);
        }
        catch(Exception e){
            throw new InternalErrorException("Failed to generate thumbnail url: "+e);
        }

        return tempThumbnail;
    }


    public FileEntity saveThumbnail(String userId, ProjectEntity project,
                                    MultipartFile thumbnail) {

        FileEntity newThumbnail;
        try{
            newThumbnail = processThumbnail(userId, thumbnail);
            project.setFileThumbnail(newThumbnail);
            newThumbnail.setProject(project);
            project = this.projectRepository.save(project);
        }
        catch (MinioException e){
            throw new InternalErrorException("Failed to save thumbnail: "+e);
        }

        return project.getFileThumbnail();
    }

    public FileEntity updateThumbnail(String userId, ProjectEntity project,
                                      FileEntity oldThumbnail, MultipartFile thumbnail) {

        // NOTE: since frontend is still limited, the only update would be to
        // replace a previously existing thumbnail
        // change this later if we need to update more attributes besides content

        if (thumbnail.isEmpty()) {
            throw new BadRequestException("Failed to update thumbnail: new thumbnail provided is null.");
        }

        //create new replacement thumbnail
        FileEntity newThumbnail = null;
        try{
            FileEntity t = project.getFileThumbnail();

            newThumbnail = processThumbnail(userId, thumbnail);
            t.setPath(newThumbnail.getPath());
            t.setName(newThumbnail.getName());
            t.setFileType(newThumbnail.getFileType());
            t.setUpdatedBy(userId);
            t.setUpdatedAt(LocalDateTime.now());
        }
        catch (MinioException e){
            throw new InternalErrorException("Failed to update thumbnail: "+e);
        }
        // delete old thumbnail
        try{
            this.minioService.delete(oldThumbnail.getPath());
        }
        catch (MinioException e){
            throw new InternalErrorException("Failed to remove old thumbnail: "+e);
        }

        //save project
        project = this.projectRepository.save(project);
        newThumbnail = project.getFileThumbnail();

        return newThumbnail;
    }

    public void deleteThumbnail(ProjectEntity project){

        FileEntity thumbnail = project.getFileThumbnail();
        if (thumbnail == null)
            throw new NotFoundException("Failed to remove thumbnail: Thumbnail does not exist.");

        // delete thumbnail
        try{
            this.minioService.delete(thumbnail.getPath());
        }
        catch (MinioException e){
            throw new InternalErrorException("Failed to remove thumbnail: "+e);
        }

        //remove thumbnail from project
        project.setFileThumbnail(null);
        this.projectRepository.save(project);

    }

    private FileEntity processThumbnail(String creatorId, MultipartFile thumbnail) throws BadRequestException, MinioException {

        String imageName, fileExtension, imgPath="";
        InputStream imageContent = null;
        int imageSize = 0;

        try {
            imageName = thumbnail.getOriginalFilename();
            imageContent = thumbnail.getInputStream();
            String[] splitName = imageName.toString().split("\\.", 2);
            fileExtension = splitName[1];
            imageName = splitName[0];
            imageSize = imageContent.available();
        } catch (Exception e) {
            throw new BadRequestException("Thumbnail file is invalid. " + e);
        }

        // hash filename to avoid issues with files with same name
        String finalName = this.minioService.getHashedFileName(imageName) + "." + fileExtension;
        imgPath = "assets/img/" + finalName;

        //check if thumbnail is valid
        if (this.minioService.validateImageSize(imageSize) == false)
            throw new BadRequestException("Failed to process thumbnail: " +
                    "image size is too big. Size should be under "+
                    this.minioService.MAX_IMAGE_SIZE_MB+" MB");

        if (this.minioService.validateImageFileExt(fileExtension) == false)
            throw new BadRequestException("Failed to process thumbnail: " +
                    "invalid file extension. File should be "+
                    java.util.Arrays.asList(MinioService.ValidImageTypes.values()));

        // save thumbnail into minio
        this.minioService.uploadFile(imgPath, imageContent);

        // set file thumbnail
        FileEntity newThumbnail = new FileEntity(creatorId, creatorId, imageName,
                imgPath, "img/"+fileExtension);
        return newThumbnail;
    }

    private ProjectEntity generateThumbnailUrl(ProjectEntity project) throws MinioException {

        ProjectEntity tempProject = new ProjectEntity();
        BeanUtils.copyProperties(project, tempProject);
        FileEntity thumbnail = project.getFileThumbnail();


        if (thumbnail != null) {
            FileEntity tempThumbnail = new FileEntity();
            BeanUtils.copyProperties(thumbnail, tempThumbnail);
            String url = this.minioService.getDownloadUrl(tempThumbnail.getPath());
            tempThumbnail.setPath(url);
            tempProject.setFileThumbnail(tempThumbnail);
        }

        return tempProject;
    }
}
