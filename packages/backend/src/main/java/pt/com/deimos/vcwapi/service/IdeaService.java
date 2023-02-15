package pt.com.deimos.vcwapi.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.dto.IdeaDTO;
import pt.com.deimos.vcwapi.dto.ProjectHasUserRoleDTO;
import pt.com.deimos.vcwapi.entity.*;
import pt.com.deimos.vcwapi.exceptions.BadRequestException;
import pt.com.deimos.vcwapi.repository.IdeaRepository;

import java.util.Optional;



@Transactional
@Service
public class IdeaService {

  private final IdeaRepository ideaRepository;

  public IdeaService(IdeaRepository ideaRepository) {
    this.ideaRepository = ideaRepository;
  }

  public Iterable<IdeaEntity> findByVcw(Long vcwId) {
    return this.ideaRepository.findByVcwHasIdeaEntityVcwId(vcwId);
  }

  public Optional<IdeaEntity> findById(Long ideaId) {
    return this.ideaRepository.findById(ideaId);
  }

  public IdeaEntity save(String userId, Long vcwId, IdeaDTO ideaDTO) {

    IdeaEntity newIdea = new IdeaEntity();
    newIdea.setCreatedBy(userId);
    newIdea.setUpdatedBy(userId);
    newIdea.setName(ideaDTO.getName());

    //link to entry type
    newIdea.setEntryTypeId(ideaDTO.getEntryTypeId());

    // create/connect to source
    //TODO: won't sources repeat if we are always creating sources everytime?
    SourceEntity s = new SourceEntity();
    BeanUtils.copyProperties(ideaDTO.getSource(), s);
    s.setCreatedBy(userId);
    s.setUpdatedBy(userId);
    newIdea.setSource(s);
    s.addIdea(newIdea);

    //connect idea with vcw
    VcwHasIdeaEntity vcwIdea = new VcwHasIdeaEntity();
    vcwIdea.setVcwId(vcwId);
    newIdea.setVcwHasIdeaEntity(vcwIdea);

    newIdea = this.ideaRepository.save(newIdea);
    if (newIdea == null ) {
      throw new BadRequestException("Failed to save idea.");
    }


    return newIdea;
  }

  public IdeaEntity update(IdeaEntity oldIdea, IdeaDTO editedInfo) {
    BeanUtils.copyProperties(editedInfo, oldIdea);
    return this.ideaRepository.save(oldIdea);
  }

  public void delete(IdeaEntity ideaEntity) {
    this.ideaRepository.delete(ideaEntity);
  }


}
