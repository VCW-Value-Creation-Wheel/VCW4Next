package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProjectHasUserRoleDTO {

    @NotBlank
    private String userId;

    @NotNull
    private Long roleId;

}
