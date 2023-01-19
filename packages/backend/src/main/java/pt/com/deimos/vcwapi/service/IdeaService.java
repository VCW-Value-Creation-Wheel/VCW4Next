package pt.com.deimos.vcwapi.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.entity.IdeaEntity;
import pt.com.deimos.vcwapi.repository.IdeaRepository;

import java.util.Optional;

@Transactional
@Service
public class IdeaService {

  private final IdeaRepository ideaRepository;

  public IdeaService(IdeaRepository ideaRepository) {
    this.ideaRepository = ideaRepository;
  }

  public Iterable<IdeaEntity> findAll() {
    return this.ideaRepository.findAll();
  }

}
