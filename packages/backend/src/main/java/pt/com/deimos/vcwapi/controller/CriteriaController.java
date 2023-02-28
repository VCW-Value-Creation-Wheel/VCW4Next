package pt.com.deimos.vcwapi.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pt.com.deimos.vcwapi.dto.CriteriaDTO;
import pt.com.deimos.vcwapi.entity.CriteriaEntity;
import pt.com.deimos.vcwapi.service.CriteriaService;

import java.util.Optional;

@RestController
@RequestMapping("/v1/projects/{project_id}/vcws/{vcw_id}/criterias")
public class CriteriaController {

  private final CriteriaService criteriaService;

  public CriteriaController(CriteriaService criteriaService) {
    this.criteriaService = criteriaService;
  }

  @GetMapping
  public ResponseEntity<Iterable<CriteriaEntity>> getByVcw(
          @PathVariable(value = "vcw_id") Long vcwId) {

    return ResponseEntity.ok(this.criteriaService.findByVcw(vcwId));
  }

  @PostMapping
  public ResponseEntity<Object> save(@PathVariable Long vcw_id,
                                     @RequestBody @Valid CriteriaDTO criteriaDTO,
                                     @AuthenticationPrincipal Jwt principal
  ) {

    return ResponseEntity.status(HttpStatus.CREATED).body(
            this.criteriaService.save(principal.getSubject(), vcw_id, criteriaDTO));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Object> update(
          @PathVariable Long id,
          @RequestBody @Valid CriteriaDTO criteriaDTO
  ) {
    Optional<CriteriaEntity> criteriaEntityOptional = this.criteriaService.findById(id);

    if(criteriaEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Criteria not found");
    }

    return ResponseEntity.status(HttpStatus.OK).body(
            this.criteriaService.update(criteriaEntityOptional.get(), criteriaDTO));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> delete(@PathVariable Long id) {
    Optional<CriteriaEntity> criteriaEntityOptional =
            this.criteriaService.findById(id);

    if(criteriaEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Criteria not found");
    }

    this.criteriaService.delete(criteriaEntityOptional.get());

    return ResponseEntity.noContent().build();
  }


}

