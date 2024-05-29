package pt.com.deimos.vcwapi.controller.prototype;

import lombok.Data;
import pt.com.deimos.vcwapi.entity.CriteriaEntity;
import pt.com.deimos.vcwapi.entity.IdeaAndCriteriaEntity;
import pt.com.deimos.vcwapi.entity.IdeaEntity;
import pt.com.deimos.vcwapi.entity.VcwHasCriteriaEntity;

@Data
public class Criteria {

    CriteriaEntity c;

    VcwHasCriteriaEntity vhc;

    IdeaAndCriteriaEntity ic;

}
