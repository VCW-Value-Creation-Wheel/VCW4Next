package pt.com.deimos.vcwapi.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@JsonSerialize
public class ProjectDTO {

  @NotBlank
  private String name;

  @NotBlank
  private String description;

  @NotBlank
  private String lang;

  private MultipartFile thumbnail;

  private List<@Valid ProjectHasUserRoleDTO> projectUsers;

}
