package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProjectDTO {

  @NotBlank
  private String title;

  @NotBlank
  private String description;

  @NotBlank
  private String lang;


}
