package pt.com.deimos.vcwapi.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.dto.DiagnosticDTO;
import pt.com.deimos.vcwapi.entity.DiagnosticEntity;
import pt.com.deimos.vcwapi.entity.VcwEntity;
import pt.com.deimos.vcwapi.repository.DiagnosticRepository;
import pt.com.deimos.vcwapi.repository.VcwRepository;

import java.util.ArrayList;
import java.util.List;

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

  public VcwEntity save(VcwEntity vcwEntity) {
    return this.vcwRepository.save(vcwEntity);
  }


  // Diagnostics
  public Iterable<DiagnosticEntity>  saveDiagnostics(Long vcwId, List<DiagnosticDTO> diagnosticDTOList) {

    List<DiagnosticEntity> diagnosticList = new ArrayList<>();
    for (DiagnosticDTO diagnosticDto : diagnosticDTOList){
      DiagnosticEntity diagnosticEntity = new DiagnosticEntity();
      BeanUtils.copyProperties(diagnosticDto, diagnosticEntity);
      diagnosticEntity.setVcwId(vcwId);
      diagnosticList.add(diagnosticEntity);
    }
    return this.diagnosticRepository.saveAll(diagnosticList);
  }
}
