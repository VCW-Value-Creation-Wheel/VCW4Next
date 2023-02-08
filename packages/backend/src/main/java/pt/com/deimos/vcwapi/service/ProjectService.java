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
import pt.com.deimos.vcwapi.repository.ProjectRepository;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    public Iterable<ProjectEntity> findAll() {

        Iterable<ProjectEntity> resultList = this.projectRepository.findAll();

        //generate image urls
        List<ProjectEntity> returnList = new ArrayList<>();
        for  (ProjectEntity project : resultList) {
            returnList.add(generateThumbnailUrl(project));
        }

        return returnList;
    }

    public Optional<ProjectEntity> findById(Long id) {

        Optional<ProjectEntity> result = this.projectRepository.findById(id);

        //generate image url
        if (!result.isEmpty())
            result = Optional.of(generateThumbnailUrl(result.get()));

        return result;
    }

    public Iterable<ProjectEntity> findByUser(String userId) {

        Iterable<ProjectEntity> resultList =
                this.projectRepository.findByProjectHasUserRoleEntitiesUserInum(userId);

        //generate image urls
        List<ProjectEntity> returnList = new ArrayList<>();
        for  (ProjectEntity project : resultList) {
            returnList.add(generateThumbnailUrl(project));
        }

        return returnList;
    }

    public Optional<ProjectEntity> findByIdAndUser(Long id, String userId) {

        Optional<ProjectEntity> result = this.projectRepository.findByIdAndProjectHasUserRoleEntitiesUserInum(id, userId);

        //generate image url
        if (!result.isEmpty())
            result = Optional.of(generateThumbnailUrl(result.get()));

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

        // add thumbnail to project if it exists
        if (thumbnail != null){
            FileEntity newThumbnail = processThumbnail(userId, thumbnail);
            newProject.setFileThumbnail(newThumbnail);
        }

        return this.projectRepository.save(newProject);

    }

    public void delete(ProjectEntity projectEntity) {
        this.projectRepository.delete(projectEntity);
    }

    private FileEntity processThumbnail(String creatorId, MultipartFile thumbnail) throws IllegalArgumentException {

        String imageName, fileExtension="";
        InputStream imageContent = null;
        int imageSize = 0;
        try {
            imageName = thumbnail.getOriginalFilename();
            imageContent = thumbnail.getInputStream();
            fileExtension = imageName.toString().split("\\.", 2)[1];
            imageSize = imageContent.available();
        } catch (Exception e){
            throw new IllegalArgumentException("Failed to process thumbnail: invalid filename");
        }

        //check if thumbnail is valid
        if (this.minioService.validateImageSize(imageSize) == false)
            throw new IllegalArgumentException("Failed to process thumbnail: " +
                    "image size is too big. Size should be under "+
                    this.minioService.MAX_IMAGE_SIZE_MB+" MB");

        if (this.minioService.validateImageFileExt(fileExtension) == false)
            throw new IllegalArgumentException("Failed to process thumbnail: " +
                    "invalid file extension. File should be MB");


        // save thumbnail into minio
        try {

            this.minioService.uploadFile("assets/img/"+imageName, imageContent);
        } catch (Exception e) {
            System.err.println("Failed to save thumbnail image in Minio due to error: "+e);
            //TODO: should we abort saving the project?
            // or save without thumbnail and let user add it later?
            return null;
        }

        // set file thumbnail
        FileEntity newThumbnail = new FileEntity(creatorId, creatorId, imageName,
                "assets/img/"+imageName, "img/"+fileExtension);
        return newThumbnail;
    }

    private ProjectEntity generateThumbnailUrl(ProjectEntity project){

        ProjectEntity tempProject = new ProjectEntity();
        BeanUtils.copyProperties(project, tempProject);
        FileEntity thumbnail = project.getFileThumbnail();

        try {
            if (thumbnail != null) {
                FileEntity tempThumbnail = new FileEntity();
                BeanUtils.copyProperties(thumbnail, tempThumbnail);
                String url = this.minioService.getDownloadUrl(tempThumbnail.getPath());
                tempThumbnail.setPath(url);
                tempProject.setFileThumbnail(tempThumbnail);
            }
        } catch (Exception e) {
            System.err.println("Failed to get download url from Minio "+e);
            //TODO: should we abort getting the project?
            // or get without thumbnail url?
        }
        return tempProject;
    }
}
