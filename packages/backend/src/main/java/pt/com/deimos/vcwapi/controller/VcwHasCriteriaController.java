package pt.com.deimos.vcwapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pt.com.deimos.vcwapi.dto.RankedDTO;
import pt.com.deimos.vcwapi.dto.SelectedDTO;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.entity.VcwHasCriteriaEntity;
import pt.com.deimos.vcwapi.exceptions.BadRequestException;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.service.VcwHasCriteriaService;

import java.util.Optional;

@RestController
@RequestMapping("/v1/projects/{project_id}/vcws/{vcw_id}/selectedCriterias")
@Tag(name = "Selected Criteria", description = "Selected criteria endpoints")
public class VcwHasCriteriaController {

    private final VcwHasCriteriaService vcwHasCriteriaService;

    public VcwHasCriteriaController(VcwHasCriteriaService vcwHasCriteriaService) {
        this.vcwHasCriteriaService = vcwHasCriteriaService;
    }

    @GetMapping
    @Operation(summary = "Shows vcw criterias.")
    public ResponseEntity<Iterable<VcwHasCriteriaEntity>> getByVcw(
            @AuthenticationPrincipal Jwt principal,
            @PathVariable(value = "project_id") Long projectId,
            @PathVariable(value = "vcw_id") Long vcwId) {

        Optional<ProjectEntity> project =
                this.vcwHasCriteriaService.findProjectByIdAndUser(projectId, principal.getSubject());
        if (project.isEmpty())
            throw new NotFoundException("Project not found.");

        return ResponseEntity.ok(this.vcwHasCriteriaService.findByVcw(vcwId));
    }

  @PutMapping("/{id}")
  @Operation(summary = "Changes the selected status of the criteria to true or false. ")
  public ResponseEntity<Object> updateSelected(
          @AuthenticationPrincipal Jwt principal,
          @PathVariable(value = "project_id") Long projectId,
          @PathVariable Long id,
          @RequestBody @Valid SelectedDTO selected
  ) {

    Optional<ProjectEntity> project =
          this.vcwHasCriteriaService.findProjectByIdAndUser(projectId, principal.getSubject());
    if (project.isEmpty())
          throw new NotFoundException("Project not found.");
    Optional<VcwHasCriteriaEntity> vcwHasCriteriaEntityOptional = this.vcwHasCriteriaService.findById(id);

    if(vcwHasCriteriaEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vcw Criteria not found");
    }

    return ResponseEntity.status(HttpStatus.OK).body(
            this.vcwHasCriteriaService.updateSelected(vcwHasCriteriaEntityOptional.get(), selected.getSelected()));
  }


    @PutMapping("/rank/{id}")
    @Operation(summary = "Sets the criteria as must have or not and also updates its ranking, weight and max/min thresh olds.")
    public ResponseEntity<Object> updateRank(
            @AuthenticationPrincipal Jwt principal,
            @PathVariable(value = "project_id") Long projectId,
            @PathVariable Long id,
            @RequestBody @Valid RankedDTO ranked
    ) {

        if (ranked.getIntervalMin() == null && ranked.getIntervalMax() == null)
            throw new BadRequestException("Both minimum and maximum thresholds are null.");

        Optional<ProjectEntity> project =
                this.vcwHasCriteriaService.findProjectByIdAndUser(projectId, principal.getSubject());
        if (project.isEmpty())
            throw new NotFoundException("Project not found.");

        Optional<VcwHasCriteriaEntity> vcwHasCriteriaEntityOptional = this.vcwHasCriteriaService.findById(id);
        if(vcwHasCriteriaEntityOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vcw Criteria not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(
                this.vcwHasCriteriaService.updateRank(vcwHasCriteriaEntityOptional.get(), ranked));
    }
      
}
