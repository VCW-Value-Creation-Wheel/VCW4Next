package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ThreeMsDto {
    
    @NotNull
    private String threeMs;
}
