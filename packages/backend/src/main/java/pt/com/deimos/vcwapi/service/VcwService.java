package pt.com.deimos.vcwapi.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.dto.DiagnosticDTO;
import pt.com.deimos.vcwapi.entity.DiagnosticEntity;
import pt.com.deimos.vcwapi.dto.VcwDTO;
import pt.com.deimos.vcwapi.entity.VcwEntity;
import pt.com.deimos.vcwapi.repository.DiagnosticRepository;
import pt.com.deimos.vcwapi.repository.VcwRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class VcwService {

  private final VcwRepository vcwRepository;
  private final DiagnosticRepository diagnosticRepository;

  public VcwService(VcwRepository vcwRepository, DiagnosticRepository diagnosticRepository) {

    this.vcwRepository = vcwRepository;
    this.diagnosticRepository = diagnosticRepository;
  }

  public Iterable<VcwEntity> findAll() {
    return this.vcwRepository.findAll();
  }

  public Iterable<VcwEntity> findByUser(String userId) {
    return this.vcwRepository.findByProjectsProjectHasUserRoleEntitiesUserInum(userId);
  }

  public Optional<VcwEntity> findByIdAndUser(Long vcwId, String userId) {
    return this.vcwRepository.findByIdAndProjectsProjectHasUserRoleEntitiesUserInum(vcwId, userId);
  }

  public VcwEntity save(VcwDTO vcwDto, String userId) {

    VcwEntity vcwEntity = new VcwEntity();
    BeanUtils.copyProperties(vcwDto, vcwEntity);
    vcwEntity.setCreatedBy(userId);
    vcwEntity.setUpdatedBy(userId);

    return this.vcwRepository.save(vcwEntity);
  }


  // Diagnostics
  public DiagnosticEntity saveDiagnostic(String userId, Long vcwId, DiagnosticDTO diagnosticDTO) {

    DiagnosticEntity diagnosticEntity = new DiagnosticEntity();
    BeanUtils.copyProperties(diagnosticDTO, diagnosticEntity);
    diagnosticEntity.setVcwId(vcwId);
    diagnosticEntity.setCreatedBy(userId);
    diagnosticEntity.setUpdatedBy(userId);

    return this.diagnosticRepository.save(diagnosticEntity);
  }
}
