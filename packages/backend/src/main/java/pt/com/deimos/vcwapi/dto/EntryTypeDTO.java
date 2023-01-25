package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EntryTypeDTO {

    @NotBlank
    private String name;
}
