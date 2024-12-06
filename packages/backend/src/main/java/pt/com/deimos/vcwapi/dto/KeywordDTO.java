package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class KeywordDTO {

    @NotBlank
    private String word;

    @NotBlank
    private String lang;
}
