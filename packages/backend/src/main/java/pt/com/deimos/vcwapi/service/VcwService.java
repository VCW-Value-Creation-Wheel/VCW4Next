package pt.com.deimos.vcwapi.service;

import org.springframework.beans.BeanUtils;
import org.springframework.scheduling.concurrent.ScheduledExecutorTask;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.dto.DiagnosticDTO;
import pt.com.deimos.vcwapi.dto.ProjectHasUserRoleDTO;
import pt.com.deimos.vcwapi.entity.DiagnosticEntity;
import pt.com.deimos.vcwapi.dto.VcwDTO;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.entity.ProjectHasUserRoleEntity;
import pt.com.deimos.vcwapi.entity.VcwEntity;
import pt.com.deimos.vcwapi.repository.DiagnosticRepository;
import pt.com.deimos.vcwapi.repository.ProjectRepository;
import pt.com.deimos.vcwapi.repository.VcwRepository;

import java.util.*;

@Transactional
@Service
public class VcwService {

  private final VcwRepository vcwRepository;
  private final DiagnosticRepository diagnosticRepository;

  private final ProjectRepository projectRepository;

  public VcwService(VcwRepository vcwRepository,
                    DiagnosticRepository diagnosticRepository,
                    ProjectRepository projectRepository) {
    this.vcwRepository = vcwRepository;
    this.diagnosticRepository = diagnosticRepository;
    this.projectRepository = projectRepository;
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

  public VcwEntity save(VcwDTO vcwDto, String userId, Long projectId) {

    VcwEntity vcwEntity = new VcwEntity();
    BeanUtils.copyProperties(vcwDto, vcwEntity);

    // set user info
    vcwEntity.setCreatedBy(userId);
    vcwEntity.setUpdatedBy(userId);

    // connect vcw and project
    ProjectEntity p = this.projectRepository.findById(projectId).get();
    p.addVcw(vcwEntity);
    vcwEntity.addProject(p);

    return this.vcwRepository.save(vcwEntity);
  }

}
