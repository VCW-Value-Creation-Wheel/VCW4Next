package pt.com.deimos.vcwapi.dto.valueCreationFunnel;

import lombok.Data;
import pt.com.deimos.vcwapi.entity.CriteriaEntity;
import pt.com.deimos.vcwapi.entity.IdeaAndCriteriaEntity;
import pt.com.deimos.vcwapi.entity.VcwHasCriteriaEntity;

@Data
public class VCFCriteriaDTO {

    private CriteriaEntity criteria;

    private VcwHasCriteriaEntity vcwHasCriteria;

    private IdeaAndCriteriaEntity ideaAndCriteria;

}
