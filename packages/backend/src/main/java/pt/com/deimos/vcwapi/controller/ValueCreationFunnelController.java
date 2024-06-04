package pt.com.deimos.vcwapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import pt.com.deimos.vcwapi.dto.valueCreationFunnel.ValueCreationFunnelDTO;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.service.ValueCreationFunnelService;

import java.util.Optional;

@RestController
@RequestMapping("/v1/projects/{project_id}/vcws/{vcw_id}/ValueCreationFunnel")
@Tag(name = "Value Creation Funnel", description = "Value Creation Funnel endpoints")
public class ValueCreationFunnelController {

    @Autowired
    ValueCreationFunnelService valueCreationFunnelService;

    @GetMapping
    @Operation(summary = "Run Value Creation Funnel (VCF) and returns result object for a given VCW.")
    ResponseEntity<ValueCreationFunnelDTO> getOValueCreationFunnelDTO(
            @AuthenticationPrincipal Jwt principal,
            @PathVariable(value = "project_id") Long projectId,
            @PathVariable(value = "vcw_id") Long vcwId) {

        Optional<ProjectEntity> project =
                valueCreationFunnelService.findProjectByIdAndUser(projectId, principal.getSubject());
        if (project.isEmpty())
            throw new NotFoundException("Project not found.");

        ValueCreationFunnelDTO vcfObj = valueCreationFunnelService.generateVCWValueCreationFunnelDTOObject(vcwId, true);

        ValueCreationFunnelDTO finalVcfObj = valueCreationFunnelService.runVcfAnalysis(vcfObj, vcwId, principal.getSubject());

        return ResponseEntity.ok(finalVcfObj);
    }

}
