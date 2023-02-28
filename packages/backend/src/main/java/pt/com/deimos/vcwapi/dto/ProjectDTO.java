package pt.com.deimos.vcwapi.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ProjectDTO {

  @NotBlank
  private String name;

  @NotBlank
  private String description;

  @NotBlank
  private String lang;


}
