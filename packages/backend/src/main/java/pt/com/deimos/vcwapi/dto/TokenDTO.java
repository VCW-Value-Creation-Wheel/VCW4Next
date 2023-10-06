package pt.com.deimos.vcwapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TokenDTO {

    @NotNull
    @JsonProperty("access_token")
    private String accessToken;

}
