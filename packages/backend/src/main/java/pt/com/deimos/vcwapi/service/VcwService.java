package pt.com.deimos.vcwapi.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.dto.DiagnosticDTO;
import pt.com.deimos.vcwapi.dto.ProjectHasUserRoleDTO;
import pt.com.deimos.vcwapi.entity.DiagnosticEntity;
import pt.com.deimos.vcwapi.dto.VcwDTO;
import pt.com.deimos.vcwapi.entity.ProjectHasUserRoleEntity;
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

  public Iterable<VcwEntity> findByProject(Long projectId) {
    return this.vcwRepository.findByProjectsId(projectId);
  }

  public Optional<VcwEntity> findById(Long vcwId) {
    return this.vcwRepository.findById(vcwId);
  }

  public VcwEntity save(VcwDTO vcwDto, String userId) {

    VcwEntity vcwEntity = new VcwEntity();
    BeanUtils.copyProperties(vcwDto, vcwEntity);

    // set user info
    vcwEntity.setCreatedBy(userId);
    vcwEntity.setUpdatedBy(userId);

    // connect vcw and project
    //vcwEntity.getProjects().add();


    return this.vcwRepository.save(vcwEntity);
  }

}
