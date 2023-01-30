package pt.com.deimos.vcwapi.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.dto.ProjectDTO;
import pt.com.deimos.vcwapi.dto.ProjectHasUserRoleDTO;
import pt.com.deimos.vcwapi.entity.FileEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.entity.ProjectHasUserRoleEntity;
import pt.com.deimos.vcwapi.repository.ProjectRepository;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ProjectService {

  private final ProjectRepository projectRepository;

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
    return this.projectRepository.findByIdAndProjectHasUserRoleEntitiesUserInum(id,userId);
  }

  public ProjectEntity save(ProjectDTO projectInfo, String userId) {

    // connect users and roles
    List<ProjectHasUserRoleEntity> projectUsers = new ArrayList<>();
    for (ProjectHasUserRoleDTO user : projectInfo.getProjectUsers()) {
      projectUsers.add(new ProjectHasUserRoleEntity(
              userId, userId, user.getRoleId(), user.getUserId()));
    }

    // set image thumbnail
    String imgPath = projectInfo.getThumbnailPath();
    FileEntity newFile = null;
    if (imgPath != "") {
      Path p = Paths.get(imgPath);
      String imgName = p.getFileName().toString();
      String imgExt = imgName.split("\\.", 2)[1];
      newFile = new FileEntity(
              userId, userId, imgName, imgPath, imgExt);
    }
      ProjectEntity newProject = new ProjectEntity(userId, userId,
              projectInfo.getName(), projectInfo.getDescription(),
              projectInfo.getLang(), newFile, projectUsers
      );

    return this.projectRepository.save(newProject);

  }

  public void delete(ProjectEntity projectEntity) {
    this.projectRepository.delete(projectEntity);
  }



}
