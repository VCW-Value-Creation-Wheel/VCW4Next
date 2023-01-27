package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class VcwDTO {

    private enum VcwType {sprint, method};

    @NotBlank
    private String name;

    @ValueOfEnum(enumClass = VcwType.class)
    private String type;

    private String challenge;

    private String concept;

    private String valueProposition;

    private String prototype;

    private String threeMs;

    private String executiveSummary;

    private Boolean closed;

    private LocalDateTime closedAt;
}
