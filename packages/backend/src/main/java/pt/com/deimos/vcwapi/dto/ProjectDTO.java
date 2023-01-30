package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class ProjectDTO {

  @NotBlank
  private String name;

  @NotBlank
  private String description;

  @NotBlank
  private String lang;

  private String attachmentPath;

  @NotBlank
  private List<ProjectHasUserRoleDTO> projectUsers;

}
