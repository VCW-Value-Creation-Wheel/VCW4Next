package pt.com.deimos.vcwapi.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.entity.VcwHasIdeaEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.repository.VcwHasIdeaRepository;
import pt.com.deimos.vcwapi.repository.ProjectRepository;

import java.util.Optional;

@Transactional
@Service
public class VcwHasIdeaService {

  private final VcwHasIdeaRepository vcwHasIdeaRepository;
  private final ProjectRepository projectRepository;

  public VcwHasIdeaService(VcwHasIdeaRepository vcwHasIdeaRepository, ProjectRepository projectRepository) {
    this.vcwHasIdeaRepository = vcwHasIdeaRepository;
    this.projectRepository = projectRepository;
  }

  public Optional<ProjectEntity> findProjectByIdAndUser(Long project_id, String userId) {
    return this.projectRepository.findByIdAndProjectHasUserRoleEntitiesUserInum(project_id, userId);
  }

  public Iterable<VcwHasIdeaEntity> findByVcw(Long vcwId) {
    return this.vcwHasIdeaRepository.findByVcwId(vcwId);
  }

  public Optional<VcwHasIdeaEntity> findById(Long vcwHasIdeaId) {
    return this.vcwHasIdeaRepository.findById(vcwHasIdeaId);
  }

  public VcwHasIdeaEntity update(VcwHasIdeaEntity oldVcwHasIdea, Boolean selected) {
    oldVcwHasIdea.setSelected(selected);
    return this.vcwHasIdeaRepository.save(oldVcwHasIdea);
  }

}
