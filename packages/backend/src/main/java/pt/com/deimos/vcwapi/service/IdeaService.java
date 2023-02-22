package pt.com.deimos.vcwapi.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.dto.IdeaDTO;
import pt.com.deimos.vcwapi.entity.IdeaEntity;
import pt.com.deimos.vcwapi.entity.SourceEntity;
import pt.com.deimos.vcwapi.entity.VcwHasIdeaEntity;
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
    //NOTE: Currently we are creating a source everytime, which causes repeated sources
    // In a future version with more detailed frontend, there should be a way to get
    // all project's sources (like a dropdown) and select one if needed or create a new one.
    if (ideaDTO.getSource() != null) {
      SourceEntity s = new SourceEntity();
      BeanUtils.copyProperties(ideaDTO.getSource(), s);
      s.setCreatedBy(userId);
      s.setUpdatedBy(userId);
      newIdea.setSource(s);
    }

    //connect idea with vcw
    VcwHasIdeaEntity vcwIdea = new VcwHasIdeaEntity();
    vcwIdea.setVcwId(vcwId);
    vcwIdea.setIdea(newIdea);
    vcwIdea.setSelected(false);
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
