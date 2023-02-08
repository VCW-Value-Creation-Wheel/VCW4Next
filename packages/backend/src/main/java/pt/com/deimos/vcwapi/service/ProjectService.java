package pt.com.deimos.vcwapi.service;

import io.minio.errors.MinioException;
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
        return this.projectRepository.findAll();
    }

    public Optional<ProjectEntity> findById(Long id) {
        return this.projectRepository.findById(id);
    }

    public Iterable<ProjectEntity> findByUser(String userId) {
        return this.projectRepository.findByProjectHasUserRoleEntitiesUserInum(userId);
    }

    public Optional<ProjectEntity> findByIdAndUser(Long id, String userId) {
        return this.projectRepository.findByIdAndProjectHasUserRoleEntitiesUserInum(id, userId);
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
            Integer test = newThumbnail.getPath().length();
            newProject.setFileThumbnail(newThumbnail);
        }

        return this.projectRepository.save(newProject);

    }

    public void delete(ProjectEntity projectEntity) {
        this.projectRepository.delete(projectEntity);
    }

    private FileEntity processThumbnail(String creatorId, MultipartFile thumbnail){

        String imageName, imageUrl, fileExtension = "";

        // save thumbnail into minio
        try {
            imageName = thumbnail.getOriginalFilename();
            InputStream imageContent = thumbnail.getInputStream();
            this.minioService.uploadFile("assets/img/"+imageName, imageContent);
            fileExtension = imageName.toString().split("\\.", 2)[1];
        } catch (Exception e) {
            System.err.println("Failed to save thumbnail image to Minio "+e);
            //TODO: should we abort saving the project?
            // or save without thumbnail and let user add it later?
            return null;
        }

        // set file thumbnail
        FileEntity newThumbnail = new FileEntity(creatorId, creatorId, imageName,
                "assets/img/"+imageName, "img/"+fileExtension);
        return newThumbnail;
    }


}
