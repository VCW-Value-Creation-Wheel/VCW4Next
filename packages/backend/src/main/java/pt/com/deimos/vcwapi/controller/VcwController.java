package pt.com.deimos.vcwapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pt.com.deimos.vcwapi.dto.ChallengeDTO;
import pt.com.deimos.vcwapi.dto.KpiDTO;
import pt.com.deimos.vcwapi.dto.PrototypeDTO;
import pt.com.deimos.vcwapi.dto.TestAndKpisEvaluationDTO;
import pt.com.deimos.vcwapi.dto.VcwDTO;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.entity.VcwEntity;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.service.VcwService;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/v1/projects/{project_id}/vcws")
@Tag(name = "Vcw", description = "Vcw endpoints")
public class VcwController {

  private final VcwService vcwService;

  public VcwController(VcwService vcwService) {
    this.vcwService = vcwService;
  }

  @GetMapping("/admin")
  @Operation(summary = "Shows All available vcws if the user is an admin role.")
  @PreAuthorize("hasAuthority('ADMIN')")
  public ResponseEntity<Iterable<VcwEntity>> index(
      @AuthenticationPrincipal Jwt principal
  ) {
    return ResponseEntity.ok(this.vcwService.findAll());
  }

  @GetMapping("/{id}")
  @Operation(summary = "Shows VCW with given id if the user has access to it.")
  public ResponseEntity<Object> getById(
          @PathVariable(value = "project_id") Long projectId,
          @AuthenticationPrincipal Jwt principal,
          @PathVariable(value = "id") Long id) {

    Optional<ProjectEntity> project =
            this.vcwService.findProjectByIdAndUser(projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");
    
    Optional<VcwEntity> vcwEntityOptional =
            this.vcwService.findById(id);

    if(vcwEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vcw not found");
    }

    return ResponseEntity.ok(vcwEntityOptional.get());
  }

  @GetMapping
  @Operation(summary = "Shows All available vcws for the given project if the user has access to it.")
  public ResponseEntity<Iterable<VcwEntity>> getByProject(
          @PathVariable(value = "project_id") Long projectId,
          @AuthenticationPrincipal Jwt principal) {

    Optional<ProjectEntity> project =
            this.vcwService.findProjectByIdAndUser(projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");
    
    return ResponseEntity.ok(this.vcwService.findByProject(projectId));
  }

  @PostMapping
  @Operation(summary = "Creates a new vcw.")
  public ResponseEntity<Object> store(
          @PathVariable(value = "project_id") Long projectId,
          @RequestBody @Valid VcwDTO vcwDTO,
          @AuthenticationPrincipal Jwt principal
  ) {

    Optional<ProjectEntity> project = this.vcwService.findProjectByIdAndUser(
            projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");
    
    return ResponseEntity.status(HttpStatus.CREATED).body(
            this.vcwService.save(vcwDTO, principal.getSubject(), projectId));
  }


  // challenges

  @GetMapping("/{id}/challenges")
  @Operation(summary = "Shows the vcw challenge.")
  public ResponseEntity<Object> getChallenge(
          @PathVariable(value = "id") Long id,
          @PathVariable(value = "project_id") Long projectId,
          @AuthenticationPrincipal Jwt principal) {

    Optional<ProjectEntity> project = this.vcwService.findProjectByIdAndUser(
            projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");
    
    Optional<VcwEntity> vcwEntityOptional =
            this.vcwService.findById(id);

    if(vcwEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vcw not found");
    }

    //find challenge
    String challenge = vcwEntityOptional.get().getChallenge();
    return ResponseEntity.ok(Collections.singletonMap("challenge", challenge));
  }

  @PutMapping("/{id}/challenges")
  @Operation(summary = "Edits the vcw challenge.")
  public ResponseEntity<Object> saveChallenges(
          @PathVariable(value = "id") Long vcwId,
          @RequestBody ChallengeDTO challenge,
          @PathVariable(value = "project_id") Long projectId,
          @AuthenticationPrincipal Jwt principal
  ) {

    Optional<ProjectEntity> project = this.vcwService.findProjectByIdAndUser(
            projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");
    
    Optional<VcwEntity> vcwEntityOptional = this.vcwService.findById(vcwId);
    if(vcwEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vcw not found");
    }
    VcwEntity editedVcw = vcwEntityOptional.get();
    editedVcw.setChallenge(challenge.getChallenge());

    return ResponseEntity.status(HttpStatus.OK).body(
            this.vcwService.update(editedVcw));

  }

  // ExpectedKpis

  @GetMapping("/{id}/kpis")
  @Operation(summary = "Shows the vcw kpis.")
  public ResponseEntity<Object> getKpis(
          @PathVariable(value = "id") Long id,
          @PathVariable(value = "project_id") Long projectId,
          @AuthenticationPrincipal Jwt principal) {

    Optional<ProjectEntity> project = this.vcwService.findProjectByIdAndUser(
            projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");

    Optional<VcwEntity> vcwEntityOptional =
            this.vcwService.findById(id);

    if(vcwEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vcw not found");
    }

    //find kpis
    String kpis = vcwEntityOptional.get().getKpis();
    return ResponseEntity.ok(Collections.singletonMap("kpis", kpis));
  }

  @PutMapping("/{id}/kpis")
  @Operation(summary = "Edits the vcw kpis.")
  public ResponseEntity<Object> saveKpis(
          @PathVariable(value = "id") Long vcwId,
          @RequestBody KpiDTO kpis,
          @PathVariable(value = "project_id") Long projectId,
          @AuthenticationPrincipal Jwt principal
  ) {

    Optional<ProjectEntity> project = this.vcwService.findProjectByIdAndUser(
            projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");

    Optional<VcwEntity> vcwEntityOptional = this.vcwService.findById(vcwId);
    if(vcwEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vcw not found");
    }
    VcwEntity editedVcw = vcwEntityOptional.get();
    editedVcw.setKpis(kpis.getKpis());

    return ResponseEntity.status(HttpStatus.OK).body(
            this.vcwService.update(editedVcw));

  }

  // prototypes

  @GetMapping("/{id}/prototypes")
  public ResponseEntity<Object> getPrototype(
          @PathVariable(value = "id") Long id,
          @PathVariable(value = "project_id") Long projectId,
          @AuthenticationPrincipal Jwt principal) {

    Optional<ProjectEntity> project = this.vcwService.findProjectByIdAndUser(
            projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");
    
    Optional<VcwEntity> vcwEntityOptional =
            this.vcwService.findById(id);

    if(vcwEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vcw not found");
    }

    //find prototype
    String prototype = vcwEntityOptional.get().getPrototype();
    return ResponseEntity.ok(Collections.singletonMap("prototype", prototype));
  }

  @PutMapping("/{id}/prototypes")
  public ResponseEntity<Object> savePrototype(
          @PathVariable(value = "id") Long vcwId,
          @RequestBody PrototypeDTO prototype,
          @PathVariable(value = "project_id") Long projectId,
          @AuthenticationPrincipal Jwt principal
  ) {

    Optional<ProjectEntity> project = this.vcwService.findProjectByIdAndUser(
            projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");
    
    Optional<VcwEntity> vcwEntityOptional = this.vcwService.findById(vcwId);
    if(vcwEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vcw not found");
    }
    VcwEntity editedVcw = vcwEntityOptional.get();
    editedVcw.setPrototype(prototype.getPrototype());

    return ResponseEntity.status(HttpStatus.OK).body(
            this.vcwService.update(editedVcw));

  }

  // Test And KPIs Evaluation

  @GetMapping("/{id}/testAndKpisEvaluation")
  public ResponseEntity<Object> getTestAndKpisEvaluation(
          @PathVariable(value = "id") Long id,
          @PathVariable(value = "project_id") Long projectId,
          @AuthenticationPrincipal Jwt principal) {

    Optional<ProjectEntity> project = this.vcwService.findProjectByIdAndUser(
            projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");
    
    Optional<VcwEntity> vcwEntityOptional =
            this.vcwService.findById(id);

    if(vcwEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vcw not found");
    }

    //find Test And KPIs Evaluation
    String testAndKpisEvaluation = vcwEntityOptional.get().getTestAndKpisEvaluation();
    return ResponseEntity.ok(Collections.singletonMap("testAndKpisEvaluation", testAndKpisEvaluation));
  }

  @PutMapping("/{id}/testAndKpisEvaluation")
  public ResponseEntity<Object> saveTestAndKpisEvaluation(
          @PathVariable(value = "id") Long vcwId,
          @RequestBody TestAndKpisEvaluationDTO testAndKpisEvaluation,
          @PathVariable(value = "project_id") Long projectId,
          @AuthenticationPrincipal Jwt principal
  ) {

    Optional<ProjectEntity> project = this.vcwService.findProjectByIdAndUser(
            projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");
    
    Optional<VcwEntity> vcwEntityOptional = this.vcwService.findById(vcwId);
    if(vcwEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vcw not found");
    }
    VcwEntity editedVcw = vcwEntityOptional.get();
    editedVcw.setTestAndKpisEvaluation(testAndKpisEvaluation.getTestAndKpisEvaluation());

    return ResponseEntity.status(HttpStatus.OK).body(
            this.vcwService.update(editedVcw));

  }



}
