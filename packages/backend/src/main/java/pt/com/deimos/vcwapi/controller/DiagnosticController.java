package pt.com.deimos.vcwapi.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pt.com.deimos.vcwapi.dto.DiagnosticDTO;
import pt.com.deimos.vcwapi.entity.DiagnosticEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.service.DiagnosticService;

import java.util.Optional;

@RestController
@RequestMapping("/v1/vcws/{vcw_id}/diagnostics")
public class DiagnosticController {

    private final DiagnosticService diagnosticService;

    public DiagnosticController(DiagnosticService diagnosticService) {
        this.diagnosticService = diagnosticService;
    }

    @GetMapping
    public ResponseEntity<Iterable<DiagnosticEntity>> getByVcw(
            @PathVariable(value = "vcw_id") Long vcwId) {

            return ResponseEntity.ok(this.diagnosticService.findByVcw(vcwId));
    }

    @PostMapping
    public ResponseEntity<Object> save(@PathVariable Long vcw_id,
            @RequestBody @Valid DiagnosticDTO diagnosticDTO,
            @AuthenticationPrincipal Jwt principal
    ) {

        return ResponseEntity.status(HttpStatus.CREATED).body(
                this.diagnosticService.save(principal.getSubject(), vcw_id, diagnosticDTO));
    }



}
