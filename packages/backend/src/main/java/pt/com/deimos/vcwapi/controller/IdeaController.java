package pt.com.deimos.vcwapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.com.deimos.vcwapi.entity.IdeaEntity;
import pt.com.deimos.vcwapi.service.IdeaService;

import java.util.Optional;

@RestController
@RequestMapping("/v1/projects/{project_id}/vcws/{vcw_id}/ideas")
public class IdeaController {

  private final IdeaService ideaService;

  public IdeaController(IdeaService ideaService) {
    this.ideaService = ideaService;
  }

  @GetMapping
  public ResponseEntity<Iterable<IdeaEntity>> getByVcw(
          @PathVariable(value = "vcw_id") Long vcwId) {

    return ResponseEntity.ok(this.ideaService.findByVcw(vcwId));
  }

//  @PostMapping
//  public ResponseEntity<Object> save(@PathVariable Long vcw_id,
//                                     @RequestBody @Valid IdeaDTO ideaDTO,
//                                     @AuthenticationPrincipal Jwt principal
//  ) {
//
//    return ResponseEntity.status(HttpStatus.CREATED).body(
//            this.ideaService.save(principal.getSubject(), vcw_id, ideaDTO));
//  }
//
//  @PutMapping("/{id}")
//  public ResponseEntity<Object> update(
//          @PathVariable Long id,
//          @RequestBody @Valid IdeaDTO ideaDTO
//  ) {
//    Optional<IdeaEntity> ideaEntityOptional = this.ideaService.findById(id);
//
//    if(ideaEntityOptional.isEmpty()) {
//      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Idea not found");
//    }
//
//    return ResponseEntity.status(HttpStatus.OK).body(
//            this.ideaService.update(ideaEntityOptional.get(), ideaDTO));
//  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> delete(@PathVariable Long id) {
    Optional<IdeaEntity> ideaEntityOptional =
            this.ideaService.findById(id);

    if(ideaEntityOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Idea not found");
    }

    this.ideaService.delete(ideaEntityOptional.get());

    return ResponseEntity.noContent().build();
  }


}

