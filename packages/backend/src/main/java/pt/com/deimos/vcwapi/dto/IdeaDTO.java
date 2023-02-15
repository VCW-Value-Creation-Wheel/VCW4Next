package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class IdeaDTO {
    @NotBlank
    private String name;

    private Long entryTypeId;

    private SourceDTO source;
}
