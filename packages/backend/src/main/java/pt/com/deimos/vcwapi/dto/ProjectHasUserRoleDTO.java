package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProjectHasUserRoleDTO {

    @NotBlank
    private String userId;

    //NOTE: even though this is Long/int in database
    // it has to be string because postman does not allow
    // us to send integers as form-data, and we need form data
    // because of the project thumbnail
    @NotNull
    private Long roleId;

}
