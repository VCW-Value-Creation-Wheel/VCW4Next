package pt.com.deimos.vcwapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.minio.errors.MinioException;
import jakarta.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pt.com.deimos.vcwapi.dto.ProjectDTO;
import pt.com.deimos.vcwapi.entity.FileEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.exceptions.BadRequestException;
import pt.com.deimos.vcwapi.exceptions.InternalErrorException;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.service.ProjectService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/projects")
@Tag(name = "Project", description = "Project endpoints")
public class ProjectController {

  private final ProjectService projectService;

  public ProjectController(ProjectService projectService) {
    this.projectService = projectService;
  }

  @GetMapping("/admin")
  @PreAuthorize("hasAuthority('ADMIN')")
  @Operation(summary = "Shows all projects if user has an admin role.")
  public ResponseEntity<Iterable<ProjectEntity>> getAll(
          @AuthenticationPrincipal Jwt principal
  ) {

    Iterable<ProjectEntity> results;
    try {
      results = this.projectService.findAll();
    } catch (MinioException e) {
      throw new InternalErrorException("Failed to generate thumbnail url: "+e);
    }

    return ResponseEntity.status(HttpStatus.OK).body(results);
  }

  @GetMapping
  @Operation(summary = "Shows all projects a user has access to.")
  public ResponseEntity<Iterable<ProjectEntity>> getByUser(
          @AuthenticationPrincipal Jwt principal) {

    Iterable<ProjectEntity> results;
    try {
      results = this.projectService.findByUser(principal.getSubject());
    } catch (MinioException e) {
      throw new InternalErrorException("Failed to generate thumbnail url: "+e);
    }

    return ResponseEntity.status(HttpStatus.OK).body(results);
  }

  @GetMapping("/{id}")
  @Operation(summary = "Shows project with given id if the user has access to it.")
  public ResponseEntity<Object> getByIdAndUser(
          @PathVariable(value = "id") Long id,
          @AuthenticationPrincipal Jwt principal) {

    return ResponseEntity.status(HttpStatus.OK).body(
            this.projectService.findByIdAndUser(id, principal.getSubject()));
  }

  @PostMapping
  @Operation(summary = "Creates a new project.")
  public ResponseEntity<Object> store(
          @RequestBody @Valid ProjectDTO project,
          @AuthenticationPrincipal Jwt principal
  ) {

    ProjectEntity results = this.projectService.save(project, principal.getSubject());

    return ResponseEntity.status(HttpStatus.CREATED).body(results);
  }

  @PutMapping("/{id}")
  @Operation(summary = "Edits a project.")
  public ResponseEntity<Object> update(
      @PathVariable Long id,
      @RequestBody @Valid ProjectDTO projectDTO,
      @AuthenticationPrincipal Jwt principal
  ) {

    return this.projectService.update(projectDTO, principal.getSubject(), id);
  }


  @DeleteMapping("/{id}")
  @Operation(summary = "Deletes project with given id if the user has access to it.")
  public ResponseEntity<Object> deleteByIdAndUser(
          @PathVariable(value = "id") Long id,
          @AuthenticationPrincipal Jwt principal) {

    Optional<ProjectEntity> project2delete = this.projectService.findByIdAndUser(id, principal.getSubject());

    if(project2delete.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
    }

    this.projectService.delete(project2delete.get());

    return ResponseEntity.noContent().build();
  }

}
