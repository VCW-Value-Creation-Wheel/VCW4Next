package pt.com.deimos.vcwapi.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import pt.com.deimos.vcwapi.entity.CriteriaEntity;

@Data
public class CriteriaDTO {

    public enum ValueType {number, yes_or_no};

    @NotBlank
    private String name;

    @NotNull
    private Long entryTypeId;

    @ValueOfEnum(enumClass = ValueType.class)
    private String valueType;
    
}
