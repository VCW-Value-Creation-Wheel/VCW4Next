package pt.com.deimos.vcwapi.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.repository.ProjectRepository;

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

  public ProjectEntity save(ProjectEntity projectEntity) {
    return this.projectRepository.save(projectEntity);
  }

  public void delete(ProjectEntity projectEntity) {
    this.projectRepository.delete(projectEntity);
  }

}
