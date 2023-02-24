package pt.com.deimos.vcwapi.controller;

import io.minio.errors.MinioException;
import jakarta.validation.Valid;
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

    Iterable<ProjectEntity> results;
    try {
      results = this.projectService.findAll();
    } catch (MinioException e) {
      throw new InternalErrorException("Failed to generate thumbnail url: "+e);
    }

    return ResponseEntity.status(HttpStatus.OK).body(results);
  }

  @GetMapping
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
  public ResponseEntity<Object> getByIdAndUser(
          @PathVariable(value = "id") Long id,
          @AuthenticationPrincipal Jwt principal) {

    return ResponseEntity.status(HttpStatus.OK).body(
            this.projectService.findByIdAndUser(id, principal.getSubject()));
  }

  @PostMapping
  public ResponseEntity<Object> store(
          @RequestPart @Valid ProjectDTO project,
          @RequestPart(required = false) MultipartFile thumbnail,
          @AuthenticationPrincipal Jwt principal
  ) {

    ProjectEntity results = this.projectService.save(project, thumbnail, principal.getSubject());

    return ResponseEntity.status(HttpStatus.CREATED).body(results);
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

//  @DeleteMapping("/{id}")
//  public ResponseEntity<Object> delete(
//      @PathVariable Long id
//  ) {
//
//    Pair<Optional<ProjectEntity>,String> results =
//            this.projectService.findById(id);
//    Optional<ProjectEntity> projectEntityOptional = results.getFirst();
//
//    if(projectEntityOptional.isEmpty()) {
//      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
//    }
//
//    this.projectService.delete(projectEntityOptional.get());
//
//    return ResponseEntity.noContent().build();
//  }

  @GetMapping("{id}/thumbnails")
  public ResponseEntity<Object> getThumbnail(
          @PathVariable(value = "id") Long id,
          @AuthenticationPrincipal Jwt principal) {

    Optional<ProjectEntity> project = this.projectService.findByIdAndUser(id, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");

    return ResponseEntity.ok(this.projectService.getThumbnail(project.get()));
  }

  @PostMapping("{id}/thumbnails")
  public ResponseEntity<Object> saveThumbnail(@PathVariable Long id,
         @RequestPart(required = true) MultipartFile thumbnail,
         @AuthenticationPrincipal Jwt principal
  ) {

    if(thumbnail.isEmpty())
      throw new BadRequestException("Invalid input thumbnail.");

    Optional<ProjectEntity> project = this.projectService.findByIdAndUser(id, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");
    ProjectEntity p = project.get();
    FileEntity oldThumbnail = p.getFileThumbnail();
    if (oldThumbnail != null)
      throw new BadRequestException("Failed to add new thumbnail, found existing one.");

    return ResponseEntity.status(HttpStatus.CREATED).body(
            this.projectService.saveThumbnail(principal.getSubject(), p, thumbnail));
  }


  @PutMapping("{id}/thumbnails/{thumbnail_id}")
  public ResponseEntity<Object> updateThumbnail(@PathVariable Long id,
         @PathVariable Long thumbnail_id,  @RequestPart(required = false) MultipartFile thumbnail,
         @AuthenticationPrincipal Jwt principal
  ) {

    Optional<ProjectEntity> project = this.projectService.findByIdAndUser(id, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");
    ProjectEntity p = project.get();
    FileEntity oldThumbnail = p.getFileThumbnail();
    if (oldThumbnail == null)
      throw new NotFoundException("Thumbnail not found.");
    if (oldThumbnail.getId() != thumbnail_id)
      throw new BadRequestException("Thumbnail id given does not match project thumbnail.");

    return ResponseEntity.status(HttpStatus.OK).body(
            this.projectService.updateThumbnail(principal.getSubject(), p,
                    oldThumbnail, thumbnail));
  }

  @DeleteMapping("{id}/thumbnails/{thumbnail_id}")
  public ResponseEntity<Object> deleteThumbnail(@PathVariable Long id,
         @PathVariable Long thumbnail_id,
         @AuthenticationPrincipal Jwt principal) {

    Optional<ProjectEntity> project = this.projectService.findByIdAndUser(id, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");
    ProjectEntity p = project.get();
    FileEntity oldThumbnail = p.getFileThumbnail();
    if (oldThumbnail == null)
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Thumbnail not found");
    if (oldThumbnail.getId() != thumbnail_id)
      throw new BadRequestException("Thumbnail id given does not match project thumbnail.");

    this.projectService.deleteThumbnail(project.get());

    return ResponseEntity.noContent().build();
  }

}
