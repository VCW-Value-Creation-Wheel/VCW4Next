package pt.com.deimos.vcwapi.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import pt.com.deimos.vcwapi.dto.multipleCriteriaDecisionAnalysis.MultipleCriteriaDecisionAnalysisDTO;
import pt.com.deimos.vcwapi.dto.valueCreationFunnel.ValueCreationFunnelDTO;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.service.MultipleCriteriaDecisionAnalysisService;
import pt.com.deimos.vcwapi.service.ValueCreationFunnelService;

@RestController
@RequestMapping("/v1/projects/{project_id}/vcws/{vcw_id}/MultipleCriteriaDecisionAnalysis")
@Tag(name = "Multiple Criteria Decision Analysis", description = "Multiple Criteria Decision Analysis endpoints")
public class MultipleCriteriaDecisionAnalysisController {

    @Autowired
    MultipleCriteriaDecisionAnalysisService multipleCriteriaDecisionAnalysisService;

    @GetMapping
    @Operation(summary = "Run Value Creation Funnel (VCF) and returns result object for a given VCW.")
    ResponseEntity<MultipleCriteriaDecisionAnalysisDTO> getOMultipleCriteriaDecisionAnalysisDTO(
            @AuthenticationPrincipal Jwt principal,
            @PathVariable(value = "project_id") Long projectId,
            @PathVariable(value = "vcw_id") Long vcwId) {

        Optional<ProjectEntity> project =
        multipleCriteriaDecisionAnalysisService.findProjectByIdAndUser(projectId, principal.getSubject());
        if (project.isEmpty())
            throw new NotFoundException("Project not found.");

        MultipleCriteriaDecisionAnalysisDTO mcdaObj = multipleCriteriaDecisionAnalysisService.generateMultipleCriteriaDecisionAnalysisDTOObject(vcwId);

        MultipleCriteriaDecisionAnalysisDTO finalMcdaObj = multipleCriteriaDecisionAnalysisService.runMcdaAnalysis(mcdaObj, vcwId, principal.getSubject());

        return ResponseEntity.ok(finalMcdaObj);

    }

}
