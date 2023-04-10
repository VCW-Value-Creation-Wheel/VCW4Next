package pt.com.deimos.vcwapi.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pt.com.deimos.vcwapi.dto.ChallengeDTO;
import pt.com.deimos.vcwapi.dto.VcwDTO;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.entity.VcwEntity;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.service.VcwService;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/v1/projects/{project_id}/vcws")
public class VcwController {

  private final VcwService vcwService;

  public VcwController(VcwService vcwService) {
    this.vcwService = vcwService;
  }

  @GetMapping("/admin")
  @PreAuthorize("hasAuthority('ADMIN')")
  public ResponseEntity<Iterable<VcwEntity>> index(
      @AuthenticationPrincipal Jwt principal
  ) {
    return ResponseEntity.ok(this.vcwService.findAll());
  }

  @GetMapping("/{id}")
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
}
