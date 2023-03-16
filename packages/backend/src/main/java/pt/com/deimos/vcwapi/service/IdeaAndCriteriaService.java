package pt.com.deimos.vcwapi.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.dto.IdeaAndCriteriaDTO;
import pt.com.deimos.vcwapi.entity.*;
import pt.com.deimos.vcwapi.exceptions.BadRequestException;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.repository.*;

import java.time.LocalDateTime;
import java.util.Optional;

@Transactional
@Service
public class IdeaAndCriteriaService {

  private final IdeaAndCriteriaRepository ideaAndCriteriaRepository;
  private final ProjectRepository projectRepository;

  private final IdeaRepository ideaRepository;

  private final CriteriaRepository criteriaRepository;

  private final SourceRepository sourceRepository;


  public IdeaAndCriteriaService(IdeaAndCriteriaRepository ideaAndCriteriaRepository,
                                ProjectRepository projectRepository,
                                IdeaRepository ideaRepository,
                                CriteriaRepository criteriaRepository,
                                SourceRepository sourceRepository) {
    this.ideaAndCriteriaRepository = ideaAndCriteriaRepository;
    this.projectRepository = projectRepository;
    this.ideaRepository = ideaRepository;
    this.criteriaRepository = criteriaRepository;
    this.sourceRepository = sourceRepository;
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

    //validate idea and criteria id
    IdeaAndCriteriaEntity newIaC = new IdeaAndCriteriaEntity();
    newIaC.setCreatedBy(userId);
    newIaC.setUpdatedBy(userId);
    newIaC.setValue(ideaAndCriteriaDTO.getValue());

    //link to idea, I check first if it still exists in case
    //we end up having people editing at the same time in the future
    Optional<IdeaEntity> i = this.ideaRepository.findById(ideaAndCriteriaDTO.getIdeaId());
    if (i.isEmpty())
      throw new NotFoundException("Idea not found.");
    newIaC.setIdea(i.get());

    //link to criteria, I check first if it still exists in case
    //we end up having people editing at the same time in the future
    Optional<CriteriaEntity> c = this.criteriaRepository.findById(ideaAndCriteriaDTO.getCriteriaId());
    if (c.isEmpty())
      throw new NotFoundException("Criteria not found.");
    if(c.get().getValueType().equals("yes_or_no") && ideaAndCriteriaDTO.getValue() < 0.0f)
      throw new BadRequestException("Value field is invalid. Use 0.0 for no and > 0.0 for yes.");
    newIaC.setCriteria(c.get());

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

  public IdeaAndCriteriaEntity update(String userId, IdeaAndCriteriaEntity oldIdeaAndCriteria,
                           IdeaAndCriteriaDTO editedInfo) {

    //update idea attributes
    BeanUtils.copyProperties(editedInfo, oldIdeaAndCriteria);
    oldIdeaAndCriteria.setUpdatedAt(LocalDateTime.now());
    oldIdeaAndCriteria.setUpdatedBy(userId);

    //update source
    // FIXME: currently update source is disabled because it is not available in frontend
    // uncomment when it is available
    /*SourceEntity oldSource = oldIdeaAndCriteria.getSource();
    SourceDTO newSourceInfo = editedInfo.getSource();
    SourceEntity newSource;
    if (newSourceInfo == null) {
      oldIdeaAndCriteria.setSource(null);
      oldSource.removeIdeaAndCriteria(oldIdeaAndCriteria);
      this.sourceRepository.delete(oldSource);
    }
    else if (oldSource == null) {
      newSource = new SourceEntity();
      BeanUtils.copyProperties(newSourceInfo, newSource);
      newSource.setCreatedBy(userId);
      newSource.setUpdatedAt(LocalDateTime.now());
      newSource.setUpdatedBy(userId);
      oldIdeaAndCriteria.setSource(newSource);
    }
    else {
      BeanUtils.copyProperties(newSourceInfo, oldSource);
      oldSource.setUpdatedAt(LocalDateTime.now());
      oldSource.setUpdatedBy(userId);
    }*/

    Optional<CriteriaEntity> c = this.criteriaRepository.findById(editedInfo.getCriteriaId());
    if(c.get().getValueType().equals("yes_or_no") && editedInfo.getValue() < 0.0f)
      throw new BadRequestException("Value field is invalid. Use 0.0 for no and > 0.0 for yes.");

    return this.ideaAndCriteriaRepository.save(oldIdeaAndCriteria);
  }

  public void delete(IdeaAndCriteriaEntity ideaAndCriteria) {
    this.ideaAndCriteriaRepository.delete(ideaAndCriteria);
  }


}
