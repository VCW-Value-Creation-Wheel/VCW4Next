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
import java.util.ArrayList;
import java.util.List;
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

        Iterable<ProjectEntity> resultList = this.projectRepository.findAll();

        //generate image urls
        List<ProjectEntity> returnList = new ArrayList<>();
        try {
            for  (ProjectEntity project : resultList) {
                returnList.add(generateThumbnailUrl(project));
            }
        }
        catch(Exception e){
            throw new InternalErrorException("Failed to generate project thumbnail url: "+e);
        }

        return returnList;
    }

    public Optional<ProjectEntity> findById(Long id) throws MinioException {

        Optional<ProjectEntity> result = this.projectRepository.findById(id);

        if (result.isEmpty())
            throw new NotFoundException("Project does not exist.");

        //generate image url
        try {
            result = Optional.of(generateThumbnailUrl(result.get()));
        }
        catch(Exception e){
            throw new InternalErrorException("Failed to generate project thumbnail url: "+e);
        }

        return result;
    }

    public Iterable<ProjectEntity> findByUser(String userId) throws MinioException {

        Iterable<ProjectEntity> resultList =
                this.projectRepository.findByProjectHasUserRoleEntitiesUserInum(userId);

        //generate image urls
        List<ProjectEntity> returnList = new ArrayList<>();
        try {
            for  (ProjectEntity project : resultList) {
                returnList.add(generateThumbnailUrl(project));
            }
        }
        catch(Exception e){
            throw new InternalErrorException("Failed to generate project thumbnail url: "+e);
        }

        return returnList;
    }

    public Optional<ProjectEntity> findByIdAndUser(Long id, String userId) throws MinioException {

        Optional<ProjectEntity> result = this.projectRepository.findByIdAndProjectHasUserRoleEntitiesUserInum(id, userId);

        if (result.isEmpty())
            throw new NotFoundException("Project does not exist.");

        //generate image url
        try {
            result = Optional.of(generateThumbnailUrl(result.get()));
        }
        catch(Exception e){
            throw new InternalErrorException("Failed to generate project thumbnail url: "+e);
        }

        return result;
    }

    public ProjectEntity save(ProjectDTO projectInfo, MultipartFile thumbnail, String userId) {

        ProjectEntity newProject = new ProjectEntity(userId, userId,
                projectInfo.getName(), projectInfo.getDescription(),
                projectInfo.getLang());

        // connect users and roles
        for (ProjectHasUserRoleDTO user : projectInfo.getProjectUsers()) {
            ProjectHasUserRoleEntity userRole = new ProjectHasUserRoleEntity(
                    userId, userId, user.getRoleId(), user.getUserId());
            userRole.setProject(newProject);
            newProject.addProjectHasUserRole(userRole);
        }

        newProject = this.projectRepository.save(newProject);
        if (newProject == null ) {
            throw new BadRequestException("Failed to save project.");
        }

        // add thumbnail to project if it exists
        if (thumbnail != null){
            try{
                FileEntity newThumbnail = processThumbnail(userId, thumbnail);
                newProject.setFileThumbnail(newThumbnail);}
            catch (Exception e){
                //TODO: send message to frontend to alert that thumbnail was not saved.
                // Not throwing exception because the project can be created without thumbnaiil.
            }
        }

        return newProject;
    }

    public void delete(ProjectEntity projectEntity) {
        this.projectRepository.delete(projectEntity);
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
