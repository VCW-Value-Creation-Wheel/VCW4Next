package pt.com.deimos.vcwapi.controller.prototype;

import java.util.List;

import lombok.Data;

import pt.com.deimos.vcwapi.entity.IdeaEntity;


@Data
public class VCFIdeaDTO {

    IdeaEntity idea;

    List<VCFCriteriaDTO> vcfCriterias;

}
