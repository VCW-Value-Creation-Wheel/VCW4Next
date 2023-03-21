package pt.com.deimos.vcwapi.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pt.com.deimos.vcwapi.dto.IdeaAndCriteriaDTO;
import pt.com.deimos.vcwapi.entity.IdeaAndCriteriaEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.exceptions.BadRequestException;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.service.IdeaAndCriteriaService;

import java.util.Optional;

@RestController
@RequestMapping("/v1/projects/{project_id}/vcws/{vcw_id}/ideasAndCriterias")
public class IdeaAndCriteriaController {

  private final IdeaAndCriteriaService ideaAndCriteriaService;

  public IdeaAndCriteriaController(IdeaAndCriteriaService ideaAndCriteriaService) {
    this.ideaAndCriteriaService = ideaAndCriteriaService;
  }

  @GetMapping
  public ResponseEntity<Iterable<IdeaAndCriteriaEntity>> getByVcw(
          @AuthenticationPrincipal Jwt principal,
          @PathVariable(value = "project_id") Long projectId,
          @PathVariable(value = "vcw_id") Long vcwId) {

    Optional<ProjectEntity> project =
            this.ideaAndCriteriaService.findProjectByIdAndUser(projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");

    return ResponseEntity.ok(this.ideaAndCriteriaService.findByVcw(vcwId));
  }

  @PostMapping
  public ResponseEntity<Object> save(
          @PathVariable(value = "project_id") Long projectId,
          @PathVariable Long vcw_id,
          @RequestBody @Valid IdeaAndCriteriaDTO ideaAndCriteriaDTO,
          @AuthenticationPrincipal Jwt principal
  ) {

    Optional<ProjectEntity> project =
            this.ideaAndCriteriaService.findProjectByIdAndUser(projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");

    return ResponseEntity.status(HttpStatus.CREATED).body(
            this.ideaAndCriteriaService.save(principal.getSubject(), ideaAndCriteriaDTO));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Object> update(
          @AuthenticationPrincipal Jwt principal,
          @PathVariable(value = "project_id") Long projectId,
          @PathVariable Long id,
          @RequestBody @Valid IdeaAndCriteriaDTO ideaAndCriteriaDTO
  ) {

      // FIXME: currently update source is disabled because it is not available in frontend
      // remove this restriction when it is available
      if (ideaAndCriteriaDTO.getSource() != null)
          throw new BadRequestException("Sources are not supported.");

    Optional<ProjectEntity> project =
            this.ideaAndCriteriaService.findProjectByIdAndUser(projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");


    Optional<IdeaAndCriteriaEntity> ideaAndCriteria = this.ideaAndCriteriaService.findById(id);
    if(ideaAndCriteria.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Idea and Criteria pair not found");
    }

    // check if url id matches the pair that has the idea and criteria given in the body
    IdeaAndCriteriaEntity pair = ideaAndCriteria.get();
    if ((ideaAndCriteriaDTO.getCriteriaId() != pair.getCriteria().getId())
      || (ideaAndCriteriaDTO.getIdeaId() != pair.getIdea().getId()))
      throw new BadRequestException("The ids given in the request body do not match the pair with id "+id);


    return ResponseEntity.status(HttpStatus.OK).body(
            this.ideaAndCriteriaService.update(principal.getId(), pair, ideaAndCriteriaDTO));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> delete(
          @AuthenticationPrincipal Jwt principal,
          @PathVariable(value = "project_id") Long projectId,
          @PathVariable Long id) {

    Optional<ProjectEntity> project =
            this.ideaAndCriteriaService.findProjectByIdAndUser(projectId, principal.getSubject());
    if (project.isEmpty())
      throw new NotFoundException("Project not found.");

    Optional<IdeaAndCriteriaEntity> ideaAndCriteriaEntityOptional =
            this.ideaAndCriteriaService.findById(id);

    if(ideaAndCriteriaEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Idea and Criteria pair not found");
    }

    this.ideaAndCriteriaService.delete(ideaAndCriteriaEntityOptional.get());

    return ResponseEntity.noContent().build();
  }


}

