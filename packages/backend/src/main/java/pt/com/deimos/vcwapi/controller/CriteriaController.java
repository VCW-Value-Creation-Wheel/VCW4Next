package pt.com.deimos.vcwapi.controller;

import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pt.com.deimos.vcwapi.dto.CriteriaDTO;
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

  @PostMapping
  public ResponseEntity<Object> store(
          @RequestBody @Valid CriteriaDTO criteriaDTO
  ) {
    CriteriaEntity criteriaEntity = new CriteriaEntity();
    BeanUtils.copyProperties(criteriaDTO, criteriaEntity);
    System.out.println(criteriaEntity.getValueType());
    return ResponseEntity.status(HttpStatus.CREATED).body(this.criteriaService.save(criteriaEntity));
  }
}
