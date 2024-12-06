package pt.com.deimos.vcwapi.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.dto.CriteriaDTO;
import pt.com.deimos.vcwapi.dto.SourceDTO;
import pt.com.deimos.vcwapi.entity.*;
import pt.com.deimos.vcwapi.exceptions.BadRequestException;
import pt.com.deimos.vcwapi.repository.CriteriaRepository;
import pt.com.deimos.vcwapi.repository.ProjectRepository;
import pt.com.deimos.vcwapi.repository.SourceRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Transactional
@Service
public class CriteriaService {

  private final CriteriaRepository criteriaRepository;
  private final ProjectRepository projectRepository;
  private final SourceRepository sourceRepository;

  public CriteriaService(ProjectRepository projectRepository, CriteriaRepository criteriaRepository,
                         SourceRepository sourceRepository) {
    this.criteriaRepository = criteriaRepository;
    this.projectRepository = projectRepository;
    this.sourceRepository = sourceRepository;
  }

  public Optional<ProjectEntity> findProjectByIdAndUser(Long project_id, String userId) {
    return this.projectRepository.findByIdAndProjectHasUserRoleEntitiesUserInum(project_id, userId);
  }

  public Iterable<CriteriaEntity> findByVcw(Long vcwId) {
    return this.criteriaRepository.findByVcwHasCriteriaEntityVcwId(vcwId);
  }

  public Optional<CriteriaEntity> findById(Long criteriaId) {
    return this.criteriaRepository.findById(criteriaId);
  }

  public CriteriaEntity save(String userId, Long vcwId, CriteriaDTO criteriaDTO) {

    CriteriaEntity newCriteria = new CriteriaEntity();
    BeanUtils.copyProperties(criteriaDTO, newCriteria);
    newCriteria.setCreatedBy(userId);
    newCriteria.setUpdatedBy(userId);
    newCriteria.setName(criteriaDTO.getName());
    newCriteria.setValueType(criteriaDTO.getValueType());

    //link to entry type
    newCriteria.setEntryTypeId(criteriaDTO.getEntryTypeId());

    // create/connect to source
    //NOTE: Currently we are creating a source everytime, which causes repeated sources
    // In a future version with more detailed frontend, there should be a way to get
    // all project's sources (like a dropdown) and select one if needed or create a new one.
    if (criteriaDTO.getSource() != null) {
      SourceEntity s = new SourceEntity();
      BeanUtils.copyProperties(criteriaDTO.getSource(), s);
      s.setCreatedBy(userId);
      s.setUpdatedBy(userId);
      newCriteria.setSource(s);
    }

    //connect criteria with vcw
    VcwHasCriteriaEntity vcwCriteria = new VcwHasCriteriaEntity();
    vcwCriteria.setVcwId(vcwId);
    vcwCriteria.setCriteria(newCriteria);
    vcwCriteria.setSelected(false);
    newCriteria.setVcwHasCriteriaEntity(vcwCriteria);

    newCriteria = this.criteriaRepository.save(newCriteria);
    if (newCriteria == null ) {
      throw new BadRequestException("Failed to save criteria.");
    }

    return newCriteria;
  }

  public CriteriaEntity update(CriteriaEntity oldCriteria, CriteriaDTO editedInfo) {
    BeanUtils.copyProperties(editedInfo, oldCriteria);
    SourceEntity oldSource = oldCriteria.getSource();
    BeanUtils.copyProperties(editedInfo.getSource(), oldSource);
    return this.criteriaRepository.save(oldCriteria);
  }

  public CriteriaEntity update(String userId, CriteriaEntity oldCriteria,
                               CriteriaDTO editedInfo) {

    //update idea attributes
    BeanUtils.copyProperties(editedInfo, oldCriteria);
    oldCriteria.setUpdatedAt(LocalDateTime.now());
    oldCriteria.setUpdatedBy(userId);

    //update source
    SourceEntity oldSource = oldCriteria.getSource();
    SourceDTO newSourceInfo = editedInfo.getSource();
    SourceEntity newSource;
    if (newSourceInfo != null && oldSource != null){
      BeanUtils.copyProperties(newSourceInfo, oldSource);
      oldSource.setUpdatedAt(LocalDateTime.now());
      oldSource.setUpdatedBy(userId);
    }
    if (newSourceInfo == null && oldSource != null) {
      oldCriteria.setSource(null);
      oldSource.removeCriteria(oldCriteria);
      this.sourceRepository.delete(oldSource);
    }
    else if (oldSource == null && newSourceInfo != null) {
      newSource = new SourceEntity();
      BeanUtils.copyProperties(newSourceInfo, newSource);
      newSource.setCreatedBy(userId);
      newSource.setUpdatedAt(LocalDateTime.now());
      newSource.setUpdatedBy(userId);
      oldCriteria.setSource(newSource);
    }

    return this.criteriaRepository.save(oldCriteria);
  }

  public void delete(CriteriaEntity criteriaEntity) {
    this.criteriaRepository.delete(criteriaEntity);
  }


}
