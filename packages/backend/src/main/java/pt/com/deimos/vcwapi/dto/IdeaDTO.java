package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class IdeaDTO {
    @NotBlank
    private String name;

    @NotNull
    private Long entryTypeId;

    private SourceDTO source;
}
