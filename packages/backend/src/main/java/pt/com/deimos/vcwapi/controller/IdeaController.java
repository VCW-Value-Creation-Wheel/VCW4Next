package pt.com.deimos.vcwapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pt.com.deimos.vcwapi.dto.IdeaDTO;
import pt.com.deimos.vcwapi.entity.IdeaEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.service.IdeaService;

import java.util.Optional;

@RestController
@RequestMapping("/v1/projects/{project_id}/vcws/{vcw_id}/ideas")
@Tag(name = "Idea", description = "Idea endpoints")
public class IdeaController {

  private final IdeaService ideaService;

  public IdeaController(IdeaService ideaService) {
    this.ideaService = ideaService;
  }

  @GetMapping
  @Operation(summary = "Gets all ideas of the vcw.")
  public ResponseEntity<Iterable<IdeaEntity>> getByVcw(
          @AuthenticationPrincipal Jwt principal,
          @PathVariable(value = "project_id") Long projectId,
          @PathVariable(value = "vcw_id") Long vcwId) {

    Optional<ProjectEntity> project =
            this.ideaService.findProjectByIdAndUser(projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");

    return ResponseEntity.ok(this.ideaService.findByVcw(vcwId));
  }

  @PostMapping
  @Operation(summary = "Adds new idea.")
  public ResponseEntity<Object> save(
          @AuthenticationPrincipal Jwt principal,
          @PathVariable(value = "project_id") Long projectId,
          @PathVariable Long vcw_id,
          @RequestBody @Valid IdeaDTO ideaDTO
  ) {

    Optional<ProjectEntity> project =
            this.ideaService.findProjectByIdAndUser(projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");

    return ResponseEntity.status(HttpStatus.CREATED).body(
            this.ideaService.save(principal.getSubject(), vcw_id, ideaDTO));
  }

  @PutMapping("/{id}")
  @Operation(summary = "Edits given idea.")
  public ResponseEntity<Object> update(
          @AuthenticationPrincipal Jwt principal,
          @PathVariable(value = "project_id") Long projectId,
          @PathVariable Long id,
          @RequestBody @Valid IdeaDTO ideaDTO
  ) {

    Optional<ProjectEntity> project =
            this.ideaService.findProjectByIdAndUser(projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");

    Optional<IdeaEntity> ideaEntityOptional = this.ideaService.findById(id);

    if(ideaEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Idea not found");
    }

    return ResponseEntity.status(HttpStatus.OK).body(
            this.ideaService.update(principal.getSubject(), ideaEntityOptional.get(), ideaDTO));
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Deletes given idea.")
  public ResponseEntity<Object> delete(
          @AuthenticationPrincipal Jwt principal,
          @PathVariable(value = "project_id") Long projectId,
          @PathVariable Long id) {

    Optional<ProjectEntity> project =
            this.ideaService.findProjectByIdAndUser(projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");

    Optional<IdeaEntity> ideaEntityOptional =
            this.ideaService.findById(id);

    if(ideaEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Idea not found");
    }

    this.ideaService.delete(ideaEntityOptional.get());

    return ResponseEntity.noContent().build();
  }


}

