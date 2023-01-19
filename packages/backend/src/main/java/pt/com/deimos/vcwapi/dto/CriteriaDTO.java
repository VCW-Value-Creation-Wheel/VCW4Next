package pt.com.deimos.vcwapi.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CriteriaDTO {

    @NotBlank
    private String name;
    
}
