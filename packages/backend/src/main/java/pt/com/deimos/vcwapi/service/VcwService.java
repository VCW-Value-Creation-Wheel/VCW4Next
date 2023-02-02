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

  public Iterable<VcwEntity> findByUser(String userId) {
    return this.vcwRepository.findByProjectsProjectHasUserRoleEntitiesUserInum(userId);
  }

  public VcwEntity save(VcwEntity vcwEntity) {
    return this.vcwRepository.save(vcwEntity);
  }

}
