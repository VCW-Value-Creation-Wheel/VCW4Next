package pt.com.deimos.vcwapi.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.dto.DiagnosticDTO;
import pt.com.deimos.vcwapi.entity.DiagnosticEntity;
import pt.com.deimos.vcwapi.repository.DiagnosticRepository;

@Transactional
@Service
public class DiagnosticService {

  private final DiagnosticRepository diagnosticRepository;

  public DiagnosticService(DiagnosticRepository diagnosticRepository) {
    this.diagnosticRepository = diagnosticRepository;
  }

  public Iterable<DiagnosticEntity> findAll() {
    return this.diagnosticRepository.findAll();
  }
  
  public DiagnosticEntity save(String userId, Long diagnosticId, DiagnosticDTO diagnosticDTO) {

    DiagnosticEntity diagnosticEntity = new DiagnosticEntity();
    BeanUtils.copyProperties(diagnosticDTO, diagnosticEntity);
    diagnosticEntity.setVcwId(diagnosticId);
    diagnosticEntity.setCreatedBy(userId);
    diagnosticEntity.setUpdatedBy(userId);

    return this.diagnosticRepository.save(diagnosticEntity);
  }

}
