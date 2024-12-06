package pt.com.deimos.vcwapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pt.com.deimos.vcwapi.dto.ProjectHasUserRoleDTO;
import pt.com.deimos.vcwapi.entity.DiagnosticEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.entity.ProjectHasUserRoleEntity;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.service.ProjectHasUserRoleService;

import java.util.Optional;

@RestController
@RequestMapping("/v1/projects/{project_id}/users")
@Tag(name = "Project User Roles", description = "Project User Roles endpoints")
public class ProjectHasUserRoleController {

    private final ProjectHasUserRoleService projectHasUserRolesService;

    public ProjectHasUserRoleController(ProjectHasUserRoleService projectHasUserRolesService) {
        this.projectHasUserRolesService = projectHasUserRolesService;
    }

    @GetMapping
    @Operation(summary = "Shows all project users.")
    public ResponseEntity<Object> getAllProjectUsers(
            @PathVariable(value = "project_id") Long project_id,
            @AuthenticationPrincipal Jwt principal) {

        //check if logged in user can access this content
        Optional<ProjectEntity> project =
                this.projectHasUserRolesService.findProjectByIdAndUser(project_id,
                        principal.getSubject());
        if (project.isEmpty())
            throw new NotFoundException("Project not found.");

        return ResponseEntity.ok(
                this.projectHasUserRolesService.findByProject(project_id));
    }

    @GetMapping("/{user_id}")
    @Operation(summary = "Shows project user with given id.")
    public ResponseEntity<Object> getProjectUserById(
            @PathVariable(value = "project_id") Long project_id,
            @PathVariable(value = "user_id") Long user_id,
            @AuthenticationPrincipal Jwt principal) {

        //check if logged in user can access this content
        Optional<ProjectEntity> project =
                this.projectHasUserRolesService.findProjectByIdAndUser(project_id,
                        principal.getSubject());
        if (project.isEmpty())
            throw new NotFoundException("Project not found.");

        return ResponseEntity.ok(
                this.projectHasUserRolesService.findByIdAndProject(user_id, project_id));
    }

    @PostMapping
    @Operation(summary = "Adds a project user.")
    public ResponseEntity<Object> addProjectUser(
            @PathVariable(value = "project_id") Long project_id,
            @RequestBody @Valid ProjectHasUserRoleDTO newUser,
            @AuthenticationPrincipal Jwt principal
    ) {

        //check if logged in user can access this content
        Optional<ProjectEntity> project =
                this.projectHasUserRolesService.findProjectByIdAndUser(project_id,
                        principal.getSubject());
        if (project.isEmpty())
            throw new NotFoundException("Project not found.");

        return ResponseEntity.status(HttpStatus.CREATED).body(
                this.projectHasUserRolesService.addProjectUser(project.get(), newUser));
    }


    @PutMapping("/{user_id}")
    @Operation(summary = "Updates a project user.")
    public ResponseEntity<Object> updateProjectUser(
            @PathVariable(value = "project_id") Long project_id,
            @PathVariable(value = "user_id") Long user_id,
            @AuthenticationPrincipal Jwt principal,
            @RequestBody @Valid ProjectHasUserRoleDTO userInfo
    ) {

        //check if logged in user can access this content
        Optional<ProjectEntity> project =
                this.projectHasUserRolesService.findProjectByIdAndUser(project_id,
                        principal.getSubject());
        if (project.isEmpty())
            throw new NotFoundException("Project not found.");

        Optional<ProjectHasUserRoleEntity> user =
                this.projectHasUserRolesService.findByIdAndProject(user_id, project_id);
        if (project.isEmpty())
            throw new NotFoundException("User not found.");

        return ResponseEntity.status(HttpStatus.OK).body(
                this.projectHasUserRolesService.updateProjectUser(user.get(), userInfo));
    }

    @DeleteMapping("/{user_id}")
    @Operation(summary = "Removes a project user.")
    public ResponseEntity<Object> deleteProjectUser(
            @PathVariable(value = "project_id") Long project_id,
            @PathVariable(value = "user_id") Long user_id,
            @AuthenticationPrincipal Jwt principal
    ) {

        //check if logged in user can access this content
        Optional<ProjectEntity> project =
                this.projectHasUserRolesService.findProjectByIdAndUser(project_id,
                        principal.getSubject());
        if (project.isEmpty())
            throw new NotFoundException("Project not found.");

        Optional<ProjectHasUserRoleEntity> user =
                this.projectHasUserRolesService.findByIdAndProject(user_id, project_id);
        if (project.isEmpty())
            throw new NotFoundException("User not found.");

        this.projectHasUserRolesService.delete(user.get());

        return ResponseEntity.noContent().build();
    }

}
