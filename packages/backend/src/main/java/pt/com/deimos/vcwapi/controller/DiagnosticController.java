package pt.com.deimos.vcwapi.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pt.com.deimos.vcwapi.dto.DiagnosticDTO;
import pt.com.deimos.vcwapi.entity.DiagnosticEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.service.DiagnosticService;

import java.util.Optional;

@RestController
@RequestMapping("/v1/projects/{project_id}/vcws/{vcw_id}/diagnostics")
public class DiagnosticController {

    private final DiagnosticService diagnosticService;

    public DiagnosticController(DiagnosticService diagnosticService) {
        this.diagnosticService = diagnosticService;
    }

    @GetMapping
    public ResponseEntity<Iterable<DiagnosticEntity>> getByVcw(
            @AuthenticationPrincipal Jwt principal,
            @PathVariable(value = "project_id") Long projectId,
            @PathVariable(value = "vcw_id") Long vcwId) {

        Optional<ProjectEntity> project =
                this.diagnosticService.findProjectByIdAndUser(projectId, principal.getSubject());
        if (project.isEmpty())
            throw new NotFoundException("Project not found.");

        return ResponseEntity.ok(this.diagnosticService.findByVcw(vcwId));
    }

    @PostMapping
    public ResponseEntity<Object> save(
            @PathVariable(value = "project_id") Long projectId,
            @PathVariable(value = "vcw_id") Long vcwId,
            @RequestBody @Valid DiagnosticDTO diagnosticDTO,
            @AuthenticationPrincipal Jwt principal
    ) {
        Optional<ProjectEntity> project =
                this.diagnosticService.findProjectByIdAndUser(projectId, principal.getSubject());
        if (project.isEmpty())
            throw new NotFoundException("Project not found.");

        return ResponseEntity.status(HttpStatus.CREATED).body(
                this.diagnosticService.save(principal.getSubject(), vcwId, diagnosticDTO));
    }

      @PutMapping("/{id}")
      public ResponseEntity<Object> update(
              @AuthenticationPrincipal Jwt principal,
              @PathVariable(value = "project_id") Long projectId,
              @PathVariable Long id,
              @RequestBody @Valid DiagnosticDTO diagnosticDTO
      ) {

        Optional<ProjectEntity> project =
              this.diagnosticService.findProjectByIdAndUser(projectId, principal.getSubject());
        if (project.isEmpty())
              throw new NotFoundException("Project not found.");
        Optional<DiagnosticEntity> diagnosticEntityOptional = this.diagnosticService.findById(id);

        if(diagnosticEntityOptional.isEmpty()) {
          return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Diagnostic not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(
                this.diagnosticService.update(diagnosticEntityOptional.get(), diagnosticDTO));
      }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(
            @AuthenticationPrincipal Jwt principal,
            @PathVariable(value = "project_id") Long projectId,
            @PathVariable Long id) {

        Optional<ProjectEntity> project =
                this.diagnosticService.findProjectByIdAndUser(projectId, principal.getSubject());
        if (project.isEmpty())
            throw new NotFoundException("Project not found.");

        Optional<DiagnosticEntity> diagnosticEntityOptional =
                this.diagnosticService.findById(id);

        if(diagnosticEntityOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Diagnostic not found");
        }

        this.diagnosticService.delete(diagnosticEntityOptional.get());

        return ResponseEntity.noContent().build();
    }

}
