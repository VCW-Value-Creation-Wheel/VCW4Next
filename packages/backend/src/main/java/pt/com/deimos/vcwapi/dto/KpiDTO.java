package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class KpiDTO {

    private String name;

    private String description;

    private String evaluation;
}
