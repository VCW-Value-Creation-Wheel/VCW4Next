package pt.com.deimos.vcwapi.controller;

import jakarta.validation.Valid;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pt.com.deimos.vcwapi.dto.ProjectDTO;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.service.ProjectService;

import java.util.Optional;

@RestController
@RequestMapping("/v1/projects")
public class ProjectController {

  private final ProjectService projectService;

  public ProjectController(ProjectService projectService) {
    this.projectService = projectService;
  }

  @GetMapping("/admin")
  @PreAuthorize("hasAuthority('ADMIN')")
  public ResponseEntity<Iterable<ProjectEntity>> getAll(
          @AuthenticationPrincipal Jwt principal
  ) {
    return ResponseEntity.ok(this.projectService.findAll());
  }

  @GetMapping
  public ResponseEntity<Iterable<ProjectEntity>> getByUser(
          @AuthenticationPrincipal Jwt principal) {
    return ResponseEntity.ok(this.projectService.findByUser(principal.getSubject()));
  }

  @GetMapping("/{id}")
  public ResponseEntity<Object> getByIdAndUser(
          @PathVariable(value = "id") Long id,
          @AuthenticationPrincipal Jwt principal) {

    Optional<ProjectEntity> projectEntityOptional =
            this.projectService.findByIdAndUser(id, principal.getSubject());

    if(projectEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
    }

    return ResponseEntity.ok(projectEntityOptional.get());
  }

  @PostMapping
  public ResponseEntity<Object> store(
          @RequestPart @Valid ProjectDTO project,
          @RequestPart(required = false) MultipartFile thumbnail,
          @AuthenticationPrincipal Jwt principal
  ) {

    Pair<ProjectEntity,String> results = this.projectService.save(project, thumbnail,
            principal.getSubject());

    ProjectEntity newProject = results.getFirst();
    String message = results.getSecond();
    if (newProject == null)
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
              .body("Unable to save project due to "+message);

    return ResponseEntity.status(HttpStatus.CREATED)
            .header("Server Message",message).body(newProject);
  }

//  @PutMapping("/{id}")
//  public ResponseEntity<Object> update(
//      @PathVariable Long id,
//      @RequestBody @Valid ProjectDTO projectDTO
//  ) {
//    Optional<ProjectEntity> projectEntityOptional = this.projectService.findById(id);
//
//    if(projectEntityOptional.isEmpty()) {
//      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
//    }
//
//    BeanUtils.copyProperties(projectDTO, projectEntityOptional.get());
//
//    return ResponseEntity.status(HttpStatus.OK).body(this.projectService.update(projectEntityOptional.get()));
//  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> delete(
      @PathVariable Long id
  ) {
    Optional<ProjectEntity> projectEntityOptional = this.projectService.findById(id);

    if(projectEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
    }

    this.projectService.delete(projectEntityOptional.get());

    return ResponseEntity.noContent().build();
  }

}
