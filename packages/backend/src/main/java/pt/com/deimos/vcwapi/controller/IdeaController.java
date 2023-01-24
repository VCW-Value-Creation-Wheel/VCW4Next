package pt.com.deimos.vcwapi.controller;

import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pt.com.deimos.vcwapi.dto.IdeaDTO;
import pt.com.deimos.vcwapi.entity.IdeaEntity;
import pt.com.deimos.vcwapi.service.IdeaService;

import java.util.Optional;

@RestController
@RequestMapping("/v1/ideas")
public class IdeaController {

  private final IdeaService ideaService;

  public IdeaController(IdeaService ideaService) {
    this.ideaService = ideaService;
  }

  @GetMapping
  @PreAuthorize("hasAuthority('ADMIN')")
  public ResponseEntity<Iterable<IdeaEntity>> index(
      @AuthenticationPrincipal Jwt principal
  ) {
    return ResponseEntity.ok(this.ideaService.findAll());
  }

}
