package pt.com.deimos.vcwapi.service;

import io.minio.errors.MinioException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import pt.com.deimos.vcwapi.dto.ProjectDTO;
import pt.com.deimos.vcwapi.dto.ProjectHasUserRoleDTO;
import pt.com.deimos.vcwapi.entity.FileEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.entity.ProjectHasUserRoleEntity;
import pt.com.deimos.vcwapi.entity.RoleEntity;
import pt.com.deimos.vcwapi.exceptions.BadRequestException;
import pt.com.deimos.vcwapi.exceptions.InternalErrorException;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.repository.ProjectRepository;
import pt.com.deimos.vcwapi.repository.RoleRepository;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Transactional
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

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

    public ProjectEntity save(ProjectDTO projectInfo, String userId) {

        ProjectEntity newProject = new ProjectEntity(userId, userId,
                projectInfo.getName(), projectInfo.getDescription(),
                projectInfo.getLang());

        //save user as project coordinator
        ProjectHasUserRoleEntity userRole = new ProjectHasUserRoleEntity();
        userRole.setUserInum(userId);
        userRole.setCreatedBy(userId);
        userRole.setUpdatedBy(userId);
        RoleEntity proxy = new RoleEntity();
        proxy.setId(1L);
        userRole.setRole(proxy);

        userRole.setProject(newProject);
        newProject.addProjectHasUserRole(userRole);

        newProject = this.projectRepository.save(newProject);
        if (newProject == null ) {
            throw new BadRequestException("Failed to save project.");
        }


        return newProject;
    }

    public void delete(ProjectEntity projectEntity) {
        this.projectRepository.delete(projectEntity);
    }

    public ResponseEntity<Object> update(ProjectDTO projectDto, String userId, Long projectId){
        Optional<ProjectEntity> projectEntityOptional = this.projectRepository.findById(projectId);

        if(projectEntityOptional.isEmpty()) {
          return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
        }

        ProjectEntity projectEntity = projectEntityOptional.get();
        projectEntity.setUpdatedBy(userId);
        projectEntity.setName(projectDto.getName());
        projectEntity.setDescription(projectDto.getDescription());
        projectEntity.setLang(projectDto.getLang());
        return ResponseEntity.status(HttpStatus.OK).body(this.projectRepository.save(projectEntity));
    }

}
