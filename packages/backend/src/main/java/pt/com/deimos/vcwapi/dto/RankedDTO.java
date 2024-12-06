package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RankedDTO {

    public enum CriteriaType {must_have, nice_to_have};

    @ValueOfEnum(enumClass = RankedDTO.CriteriaType.class)
    private String type;

    @NotNull
    private Integer ranking;

    private Float weight;

    private Float intervalMin;

    private Float intervalMax;
}
