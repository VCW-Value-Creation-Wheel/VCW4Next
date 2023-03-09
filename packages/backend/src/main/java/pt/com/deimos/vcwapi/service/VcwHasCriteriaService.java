package pt.com.deimos.vcwapi.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.entity.VcwHasCriteriaEntity;
import pt.com.deimos.vcwapi.repository.ProjectRepository;
import pt.com.deimos.vcwapi.repository.VcwHasCriteriaRepository;

import java.util.Optional;

@Transactional
@Service
public class VcwHasCriteriaService {

  private final VcwHasCriteriaRepository vcwHasCriteriaRepository;
  private final ProjectRepository projectRepository;

  public VcwHasCriteriaService(VcwHasCriteriaRepository vcwHasCriteriaRepository, ProjectRepository projectRepository) {
    this.vcwHasCriteriaRepository = vcwHasCriteriaRepository;
    this.projectRepository = projectRepository;
  }

  public Optional<ProjectEntity> findProjectByIdAndUser(Long project_id, String userId) {
    return this.projectRepository.findByIdAndProjectHasUserRoleEntitiesUserInum(project_id, userId);
  }

  public Iterable<VcwHasCriteriaEntity> findByVcw(Long vcwId) {
    return this.vcwHasCriteriaRepository.findByVcwId(vcwId);
  }

  public Optional<VcwHasCriteriaEntity> findById(Long vcwHasCriteriaId) {
    return this.vcwHasCriteriaRepository.findById(vcwHasCriteriaId);
  }

  public VcwHasCriteriaEntity update(VcwHasCriteriaEntity oldVcwHasCriteria, Boolean selected) {
    oldVcwHasCriteria.setSelected(selected);
    return this.vcwHasCriteriaRepository.save(oldVcwHasCriteria);
  }

}
