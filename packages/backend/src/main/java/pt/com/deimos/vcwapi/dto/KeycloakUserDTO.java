package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class KeycloakUserDTO {

    @NotBlank
    private String id;

    @NotBlank
    private String username;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

}
