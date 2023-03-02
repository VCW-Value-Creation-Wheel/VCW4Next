package pt.com.deimos.vcwapi.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.dto.CriteriaDTO;
import pt.com.deimos.vcwapi.dto.IdeaAndCriteriaDTO;
import pt.com.deimos.vcwapi.entity.*;
import pt.com.deimos.vcwapi.exceptions.BadRequestException;
import pt.com.deimos.vcwapi.repository.IdeaAndCriteriaRepository;
import pt.com.deimos.vcwapi.repository.ProjectRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Transactional
@Service
public class IdeaAndCriteriaService {

  private final IdeaAndCriteriaRepository ideaAndCriteriaRepository;
  private final ProjectRepository projectRepository;

  public IdeaAndCriteriaService(ProjectRepository projectRepository,
                                IdeaAndCriteriaRepository ideaAndCriteriaRepository) {
    this.ideaAndCriteriaRepository = ideaAndCriteriaRepository;
    this.projectRepository = projectRepository;
  }

  public Optional<ProjectEntity> findProjectByIdAndUser(Long project_id, String userId) {
    return this.projectRepository.findByIdAndProjectHasUserRoleEntitiesUserInum(project_id, userId);
  }

  public Iterable<IdeaAndCriteriaEntity> findByVcw(Long vcwId) {
    // search all idea and criteria pairs via the connection with idea
    return this.ideaAndCriteriaRepository.findByIdeaVcwHasIdeaEntityVcwId(vcwId);
  }

  public Optional<IdeaAndCriteriaEntity> findById(Long ideaAndCriteriaId) {
    return this.ideaAndCriteriaRepository.findById(ideaAndCriteriaId);
  }

  public IdeaAndCriteriaEntity save(String userId, IdeaAndCriteriaDTO ideaAndCriteriaDTO) {

    IdeaAndCriteriaEntity newIaC = new IdeaAndCriteriaEntity();
    newIaC.setCreatedBy(userId);
    newIaC.setUpdatedBy(userId);
    newIaC.setValue(ideaAndCriteriaDTO.getValue());
    newIaC.setValueUpdatedAt(LocalDateTime.now());

    //link to idea
    IdeaEntity i = new IdeaEntity();
    i.setId(ideaAndCriteriaDTO.getIdeaId());
    newIaC.setIdea(i);

    //link to criteria
    CriteriaEntity c = new CriteriaEntity();
    c.setId(ideaAndCriteriaDTO.getCriteriaId());
    newIaC.setCriteria(c);

    // create/connect to source
    //NOTE: Currently we are creating a source everytime, which causes repeated sources
    // In a future version with more detailed frontend, there should be a way to get
    // all project's sources (like a dropdown) and select one if needed or create a new one.
    if (ideaAndCriteriaDTO.getSource() != null) {
      SourceEntity s = new SourceEntity();
      BeanUtils.copyProperties(ideaAndCriteriaDTO.getSource(), s);
      s.setCreatedBy(userId);
      s.setUpdatedBy(userId);
      newIaC.setSource(s);
    }

    return this.ideaAndCriteriaRepository.save(newIaC);
  }

  public IdeaAndCriteriaEntity update(IdeaAndCriteriaEntity oldIdeaAndCriteria,
                                      IdeaAndCriteriaDTO editedInfo) {
    BeanUtils.copyProperties(editedInfo, oldIdeaAndCriteria);
    return this.ideaAndCriteriaRepository.save(oldIdeaAndCriteria);
  }

  public void delete(IdeaAndCriteriaEntity ideaAndCriteria) {
    this.ideaAndCriteriaRepository.delete(ideaAndCriteria);
  }


}
