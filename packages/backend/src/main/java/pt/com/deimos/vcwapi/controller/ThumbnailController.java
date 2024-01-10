package pt.com.deimos.vcwapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pt.com.deimos.vcwapi.entity.FileEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.exceptions.BadRequestException;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.service.ThumbnailService;

import java.util.Optional;

@RestController
@RequestMapping("/v1/projects/{project_id}/thumbnails")
@Tag(name = "Project Thumbnail", description = "Project Thumbnail endpoints")
public class ThumbnailController {

    private final ThumbnailService thumbnailService;

    public ThumbnailController(ThumbnailService thumbnailService) {
        this.thumbnailService = thumbnailService;
    }

    @GetMapping
    @Operation(summary = "Show project thumbnail.")
    public ResponseEntity<Object> getThumbnail(
            @PathVariable(value = "project_id") Long projectId,
            @AuthenticationPrincipal Jwt principal) {

        Optional<ProjectEntity> project =
                this.thumbnailService.findProjectByIdAndUser(projectId, principal.getSubject());
        if (project.isEmpty())
            throw new NotFoundException("Project not found.");

        return ResponseEntity.ok(this.thumbnailService.findByProject(projectId));
    }

    @PostMapping
    @Operation(summary = "Create project thumbnail.")
    public ResponseEntity<Object> saveThumbnail(
           @PathVariable(value = "project_id") Long projectId,
           @RequestPart(required = true) MultipartFile thumbnail,
           @AuthenticationPrincipal Jwt principal
    ) {

        if(thumbnail.isEmpty())
            throw new BadRequestException("Invalid input thumbnail.");

        Optional<ProjectEntity> project = this.thumbnailService.findProjectByIdAndUser(
                projectId, principal.getSubject());
        if (project.isEmpty())
            throw new NotFoundException("Project not found.");

        return ResponseEntity.status(HttpStatus.CREATED).body(
                this.thumbnailService.save(principal.getSubject(), project.get(), thumbnail));
    }

    @PutMapping("/{thumbnail_id}")
    @Operation(summary = "Updates the project thumbnail.")
    public ResponseEntity<Object> updateThumbnail(
            @PathVariable(value = "project_id") Long projectId,
            @PathVariable(value = "thumbnail_id") Long thumbnailId,
            @RequestPart(required = true) MultipartFile thumbnail,
            @AuthenticationPrincipal Jwt principal
    ) {

        if (thumbnail.isEmpty()) 
            throw new BadRequestException("Invalid input thumbnail.");

        Optional<ProjectEntity> project = this.thumbnailService.findProjectByIdAndUser(
                projectId, principal.getSubject());
        if (project.isEmpty())
            throw new NotFoundException("Project not found.");

        Optional<FileEntity> oldThumbnail =
                this.thumbnailService.findByIdAndProject(thumbnailId, projectId);
        if (oldThumbnail.isEmpty())
            throw new NotFoundException("Thumbnail not found.");

        return ResponseEntity.status(HttpStatus.OK).body(
                this.thumbnailService.update(principal.getSubject(),
                        oldThumbnail.get(), thumbnail));
    }

    @DeleteMapping("/{thumbnail_id}")
    @Operation(summary = "Deletes the project thumbnail.")
    public ResponseEntity<Object> deleteThumbnail(
            @PathVariable(value = "project_id") Long projectId,
            @PathVariable(value = "thumbnail_id") Long thumbnailId,
            @AuthenticationPrincipal Jwt principal) {

        Optional<ProjectEntity> project = this.thumbnailService.findProjectByIdAndUser(
                projectId, principal.getSubject());
        if (project.isEmpty())
            throw new NotFoundException("Project not found.");

        Optional<FileEntity> thumbnail =
                this.thumbnailService.findByIdAndProject(thumbnailId, projectId);
        if (thumbnail.isEmpty())
            throw new NotFoundException("Thumbnail not found.");

        this.thumbnailService.delete(thumbnail.get());

        return ResponseEntity.noContent().build();
    }

}
