package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ChallengeDTO {

    @NotNull
    private String challenge;
}
