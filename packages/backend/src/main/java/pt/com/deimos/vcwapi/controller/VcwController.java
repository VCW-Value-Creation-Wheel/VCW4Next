package pt.com.deimos.vcwapi.controller;

import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pt.com.deimos.vcwapi.dto.VcwDTO;
import pt.com.deimos.vcwapi.entity.VcwEntity;
import pt.com.deimos.vcwapi.service.VcwService;

import java.util.Optional;

@RestController
@RequestMapping("/v1/vcws")
public class VcwController {

  private final VcwService vcwService;

  public VcwController(VcwService vcwService) {
    this.vcwService = vcwService;
  }

  @GetMapping("/admin")
  @PreAuthorize("hasAuthority('ADMIN')")
  public ResponseEntity<Iterable<VcwEntity>> index(
      @AuthenticationPrincipal Jwt principal
  ) {
    return ResponseEntity.ok(this.vcwService.findAll());
  }

  @GetMapping
  public ResponseEntity<Iterable<VcwEntity>> getByUser(
          @AuthenticationPrincipal Jwt principal) {
    return ResponseEntity.ok(this.vcwService.findByUser(principal.getSubject()));
  }

  @GetMapping("/{id}")
  public ResponseEntity<Object> getByIdAndUser(
          @PathVariable(value = "id") Long id,
          @AuthenticationPrincipal Jwt principal) {

    Optional<VcwEntity> vcwEntityOptional =
            this.vcwService.findByIdAndUser(id, principal.getSubject());

    if(vcwEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vcw not found");
    }

    return ResponseEntity.ok(vcwEntityOptional.get());
  }



  @PostMapping
  public ResponseEntity<Object> store(
          @RequestBody @Valid VcwDTO vcwDTO,
          @AuthenticationPrincipal Jwt principal
  ) {

    return ResponseEntity.status(HttpStatus.CREATED).body(
            this.vcwService.save(vcwDTO, principal.getSubject()));
  }
  
}
