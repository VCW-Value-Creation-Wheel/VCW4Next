package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DiagnosticDTO {

    public enum SwotField {strength, weakness, opportunity, threat};

    @NotNull
    private Long vcwId;

    @ValueOfEnum(enumClass = SwotField.class)
    private String swotField;

    @NotBlank
    private String name;

    private String description;
}
