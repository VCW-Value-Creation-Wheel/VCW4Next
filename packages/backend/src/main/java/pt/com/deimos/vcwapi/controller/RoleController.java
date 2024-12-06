package pt.com.deimos.vcwapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.oauth2.jwt.Jwt;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import pt.com.deimos.vcwapi.entity.RoleEntity;

import pt.com.deimos.vcwapi.service.RoleService;

@RestController
@RequestMapping("v1/roles")
@Tag(name="Roles", description = "Roles endpoints")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService){
        this.roleService = roleService;
    }

    @GetMapping
    @Operation(summary = "Show all roles")
    public ResponseEntity<Iterable<RoleEntity>> getRoles(
        @AuthenticationPrincipal Jwt principal){

            return ResponseEntity.ok(this.roleService.findAll());
        }
    
}
