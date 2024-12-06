package pt.com.deimos.vcwapi.controller;

import io.minio.errors.MinioException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import pt.com.deimos.vcwapi.dto.KeycloakUserDTO;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.exceptions.ForbiddenException;
import pt.com.deimos.vcwapi.exceptions.InternalErrorException;
import pt.com.deimos.vcwapi.exceptions.UnauthorizedException;
import pt.com.deimos.vcwapi.service.KeycloakService;
import reactor.core.publisher.Flux;

import java.util.List;

@RestController
@RequestMapping("/v1/users")
@Tag(name = "Keycloak Users", description = "Keycloak Users endpoints")
public class KeycloakUserController {

    private final KeycloakService keycloakService;

    public KeycloakUserController(KeycloakService keycloakService) {
        this.keycloakService = keycloakService;
    }

    @GetMapping
    @Operation(summary = "Search system users by username.")
    public ResponseEntity<Object> getUsersByUsername(
            @AuthenticationPrincipal Jwt principal,
            @RequestParam(required = false) String search) {


        List<KeycloakUserDTO> results;
        try {
            results = this.keycloakService.getUsersByUsername(search, principal.getTokenValue());
        } catch (WebClientResponseException.Unauthorized e){
            throw new UnauthorizedException("Failed to get user info from keycloak.");
        }
        catch (WebClientResponseException.Forbidden e){
            throw new ForbiddenException("Failed to get user info from keycloak.");
        }
        catch (Exception e) {
            throw new InternalErrorException("Failed to get user info from keycloak: " + e);
        }

        return ResponseEntity.status(HttpStatus.OK).body(results);
    }

    @GetMapping("/id/{uuid}")
    public ResponseEntity<Object> getUsersByHashCode(
        @AuthenticationPrincipal Jwt principal,
        @PathVariable String uuid
    ){
        List<KeycloakUserDTO> results;
        try {
            results = this.keycloakService.getUsersByHashCode(uuid, principal.getTokenValue());
        } catch (WebClientResponseException.Unauthorized e){
            throw new UnauthorizedException("Failed to get user info from keycloak.");
        }
        catch (WebClientResponseException.Forbidden e){
            throw new ForbiddenException("Failed to get user info from keycloak.");
        }
        catch (Exception e) {
            throw new InternalErrorException("Failed to get user info from keycloak: " + e);
        }

        return ResponseEntity.status(HttpStatus.OK).body(results);
    }

}