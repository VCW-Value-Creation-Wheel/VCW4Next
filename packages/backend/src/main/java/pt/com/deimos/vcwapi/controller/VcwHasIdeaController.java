package pt.com.deimos.vcwapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pt.com.deimos.vcwapi.dto.DiagnosticDTO;
import pt.com.deimos.vcwapi.dto.SelectedDTO;
import pt.com.deimos.vcwapi.entity.VcwHasIdeaEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.service.VcwHasIdeaService;

import java.util.Optional;

@RestController
@RequestMapping("/v1/projects/{project_id}/vcws/{vcw_id}/selectedIdeas")
@Tag(name = "Selected Idea", description = "Selected idea endpoints")
public class VcwHasIdeaController {

    private final VcwHasIdeaService vcwHasIdeaService;

    public VcwHasIdeaController(VcwHasIdeaService vcwHasIdeaService) {
        this.vcwHasIdeaService = vcwHasIdeaService;
    }

    @GetMapping
    @Operation(summary = "Shows vcw ideas.")
    public ResponseEntity<Iterable<VcwHasIdeaEntity>> getByVcw(
            @AuthenticationPrincipal Jwt principal,
            @PathVariable(value = "project_id") Long projectId,
            @PathVariable(value = "vcw_id") Long vcwId) {

        Optional<ProjectEntity> project =
                this.vcwHasIdeaService.findProjectByIdAndUser(projectId, principal.getSubject());
        if (project.isEmpty())
            throw new NotFoundException("Project not found.");

        return ResponseEntity.ok(this.vcwHasIdeaService.findByVcw(vcwId));
    }

  @PutMapping("/{id}")
  @Operation(summary = "Changes the selected status of the idea to true or false.")
  public ResponseEntity<Object> update(
          @AuthenticationPrincipal Jwt principal,
          @PathVariable(value = "project_id") Long projectId,
          @PathVariable Long id,
          @RequestBody @Valid SelectedDTO selected
  ) {

    Optional<ProjectEntity> project =
          this.vcwHasIdeaService.findProjectByIdAndUser(projectId, principal.getSubject());
    if (project.isEmpty())
          throw new NotFoundException("Project not found.");
    Optional<VcwHasIdeaEntity> vcwHasIdeaEntityOptional = this.vcwHasIdeaService.findById(id);

    if(vcwHasIdeaEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vcw Idea not found");
    }

    return ResponseEntity.status(HttpStatus.OK).body(
            this.vcwHasIdeaService.update(vcwHasIdeaEntityOptional.get(), selected.getSelected()));
  }
      
}
