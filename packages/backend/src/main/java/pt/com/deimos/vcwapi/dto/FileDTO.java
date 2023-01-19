package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FileDTO {

    @NotBlank
    private String name;

    @NotBlank
    private String path;

    private String fileType;
}
