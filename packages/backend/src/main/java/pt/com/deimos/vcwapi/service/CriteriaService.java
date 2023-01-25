package pt.com.deimos.vcwapi.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.entity.CriteriaEntity;
import pt.com.deimos.vcwapi.repository.CriteriaRepository;

@Transactional
@Service
public class CriteriaService {

  private final CriteriaRepository criteriaRepository;

  public CriteriaService(CriteriaRepository criteriaRepository) {
    this.criteriaRepository = criteriaRepository;
  }

  public Iterable<CriteriaEntity> findAll() {
    return this.criteriaRepository.findAll();
  }

  public CriteriaEntity save(CriteriaEntity criteriaEntity) {
    return this.criteriaRepository.save(criteriaEntity);
  }

}
