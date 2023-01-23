package pt.com.deimos.vcwapi.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.entity.VcwEntity;
import pt.com.deimos.vcwapi.repository.VcwRepository;

@Transactional
@Service
public class VcwService {

  private final VcwRepository vcwRepository;

  public VcwService(VcwRepository vcwRepository) {
    this.vcwRepository = vcwRepository;
  }

  public Iterable<VcwEntity> findAll() {
    return this.vcwRepository.findAll();
  }

}
