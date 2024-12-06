package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SourceDTO {

    @NotBlank
    private String name;

    // NOTE: this exists in db but it is not currently used.
    // remove later if not needed
    //private String description;

    private String url;

}
