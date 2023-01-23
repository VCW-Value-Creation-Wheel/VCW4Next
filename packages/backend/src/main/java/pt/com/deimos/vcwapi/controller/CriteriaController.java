package pt.com.deimos.vcwapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pt.com.deimos.vcwapi.entity.CriteriaEntity;
import pt.com.deimos.vcwapi.service.CriteriaService;

@RestController
@RequestMapping("/v1/criterias")
public class CriteriaController {

  private final CriteriaService criteriaService;

  public CriteriaController(CriteriaService criteriaService) {
    this.criteriaService = criteriaService;
  }

  @GetMapping
  @PreAuthorize("hasAuthority('ADMIN')")
  public ResponseEntity<Iterable<CriteriaEntity>> index(
      @AuthenticationPrincipal Jwt principal
  ) {
    return ResponseEntity.ok(this.criteriaService.findAll());
  }
}
