package pt.com.deimos.vcwapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pt.com.deimos.vcwapi.dto.CriteriaDTO;
import pt.com.deimos.vcwapi.entity.CriteriaEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.service.CriteriaService;

import java.util.Optional;

@RestController
@RequestMapping("/v1/projects/{project_id}/vcws/{vcw_id}/criterias")
@Tag(name = "Criteria", description = "Criteria endpoints")
public class CriteriaController {

  private final CriteriaService criteriaService;

  public CriteriaController(CriteriaService criteriaService) {
    this.criteriaService = criteriaService;
  }

  @GetMapping
  @Operation(summary = "Gets all criterias of the vcw.")
  public ResponseEntity<Iterable<CriteriaEntity>> getByVcw(
          @AuthenticationPrincipal Jwt principal,
          @PathVariable(value = "project_id") Long projectId,
          @PathVariable(value = "vcw_id") Long vcwId) {

    Optional<ProjectEntity> project =
            this.criteriaService.findProjectByIdAndUser(projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");

    return ResponseEntity.ok(this.criteriaService.findByVcw(vcwId));
  }

  @PostMapping
  @Operation(summary = "Adds new criteria.")
  public ResponseEntity<Object> save(
          @PathVariable(value = "project_id") Long projectId,
          @PathVariable Long vcw_id,
          @RequestBody @Valid CriteriaDTO criteriaDTO,
          @AuthenticationPrincipal Jwt principal
  ) {

    Optional<ProjectEntity> project =
            this.criteriaService.findProjectByIdAndUser(projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");

    return ResponseEntity.status(HttpStatus.CREATED).body(
            this.criteriaService.save(principal.getSubject(), vcw_id, criteriaDTO));
  }

  @PutMapping("/{id}")
  @Operation(summary = "Updates given criteria.")
  public ResponseEntity<Object> update(
          @AuthenticationPrincipal Jwt principal,
          @PathVariable(value = "project_id") Long projectId,
          @PathVariable Long id,
          @RequestBody @Valid CriteriaDTO criteriaDTO
  ) {

    Optional<ProjectEntity> project =
            this.criteriaService.findProjectByIdAndUser(projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");

    Optional<CriteriaEntity> criteriaEntityOptional = this.criteriaService.findById(id);

    if(criteriaEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Criteria not found");
    }

    return ResponseEntity.status(HttpStatus.OK).body(
            this.criteriaService.update(principal.getSubject(), criteriaEntityOptional.get(), criteriaDTO));
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Deletes given criteria.")
  public ResponseEntity<Object> delete(
          @AuthenticationPrincipal Jwt principal,
          @PathVariable(value = "project_id") Long projectId,
          @PathVariable Long id) {

    Optional<ProjectEntity> project =
            this.criteriaService.findProjectByIdAndUser(projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");

    Optional<CriteriaEntity> criteriaEntityOptional =
            this.criteriaService.findById(id);

    if(criteriaEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Criteria not found");
    }

    this.criteriaService.delete(criteriaEntityOptional.get());

    return ResponseEntity.noContent().build();
  }


}

