package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ConceptDTO {

    @NotNull
    private String concept;
    
}
