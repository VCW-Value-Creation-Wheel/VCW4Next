package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SourceDTO {

    @NotBlank
    private String name;

    private String description;

    private String url;

}
