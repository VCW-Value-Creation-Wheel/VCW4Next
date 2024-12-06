package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class IdeaAndCriteriaDTO {

    @NotNull
    private Long ideaId;

    @NotNull
    private Long criteriaId;

    @NotNull
    private Float value;

    private SourceDTO source;
}
