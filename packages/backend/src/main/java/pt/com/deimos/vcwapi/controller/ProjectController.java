package pt.com.deimos.vcwapi.controller;

import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
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

  @GetMapping
  @PreAuthorize("hasAuthority('ADMIN')")
  public ResponseEntity<Iterable<ProjectEntity>> index(
      @AuthenticationPrincipal Jwt principal
  ) {
    return ResponseEntity.ok(this.projectService.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Object> show(
      @PathVariable(value = "id") Long id
  ) {
    Optional<ProjectEntity> projectEntityOptional = this.projectService.findById(id);

    if(projectEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
    }

    return ResponseEntity.ok(projectEntityOptional.get());
  }

  @PostMapping
  public ResponseEntity<Object> store(
      @RequestBody @Valid ProjectDTO projectDTO
  ) {
    ProjectEntity projectEntity = new ProjectEntity();
    BeanUtils.copyProperties(projectDTO, projectEntity);

    return ResponseEntity.status(HttpStatus.CREATED).body(this.projectService.save(projectEntity));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Object> update(
      @PathVariable Long id,
      @RequestBody @Valid ProjectDTO projectDTO
  ) {
    Optional<ProjectEntity> projectEntityOptional = this.projectService.findById(id);

    if(projectEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
    }

    BeanUtils.copyProperties(projectDTO, projectEntityOptional.get());

    return ResponseEntity.status(HttpStatus.OK).body(this.projectService.save(projectEntityOptional.get()));
  }

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
