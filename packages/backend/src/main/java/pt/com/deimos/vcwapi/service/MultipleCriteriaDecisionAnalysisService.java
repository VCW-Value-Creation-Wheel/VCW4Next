package pt.com.deimos.vcwapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.com.deimos.vcwapi.dto.multipleCriteriaDecisionAnalysis.MCDACriteriaDTO;
import pt.com.deimos.vcwapi.dto.multipleCriteriaDecisionAnalysis.MCDAIdeaDTO;
import pt.com.deimos.vcwapi.dto.multipleCriteriaDecisionAnalysis.MultipleCriteriaDecisionAnalysisDTO;
import pt.com.deimos.vcwapi.dto.valueCreationFunnel.VCFCriteriaDTO;
import pt.com.deimos.vcwapi.dto.valueCreationFunnel.VCFIdeaDTO;
import pt.com.deimos.vcwapi.dto.valueCreationFunnel.ValueCreationFunnelDTO;
import pt.com.deimos.vcwapi.entity.*;
import pt.com.deimos.vcwapi.exceptions.CriteriasNotFoundException;
import pt.com.deimos.vcwapi.exceptions.IdeaAndCriteriasNotFoundException;
import pt.com.deimos.vcwapi.exceptions.IdeasNotFoundException;
import pt.com.deimos.vcwapi.repository.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MultipleCriteriaDecisionAnalysisService {

    @Autowired
    IdeaAndCriteriaRepository ideaAndCriteriaRepository;
    @Autowired
    ValueCreationFunnelService valueCreationFunnelService;

    @Autowired
    ProjectRepository projectRepository;

    public Optional<ProjectEntity> findProjectByIdAndUser(Long project_id, String userId) {
        return this.projectRepository.findByIdAndProjectHasUserRoleEntitiesUserInum(project_id, userId);
    }

    // create MCDA DTO to be used in the analysis
    public MultipleCriteriaDecisionAnalysisDTO generateMultipleCriteriaDecisionAnalysisDTOObject(Long vcwId) {

        ValueCreationFunnelDTO vcfMustHaveObj = valueCreationFunnelService.generateVCWValueCreationFunnelDTOObject(vcwId, true);
        ValueCreationFunnelDTO vcfNiceToHaveObj = valueCreationFunnelService.generateVCWValueCreationFunnelDTOObject(vcwId, false);

        // remove rejected ideas by the VCF analysis
        for (VCFIdeaDTO vcfIdea : vcfMustHaveObj.getVcfIdeas()) {

            Boolean isRejected = vcfIdea
                    .getVcfCriterias()
                    .stream()
                    .anyMatch(c -> !c.getIdeaAndCriteria().getVcfResult());

            if(isRejected) {
                System.out.println(vcfIdea.getIdea().getName());
                vcfNiceToHaveObj.getVcfIdeas().removeIf(i -> i.getIdea().getId() == vcfIdea.getIdea().getId());
            }
        }

        // create MCDA object with ideas not rejected in the VCF analysis
        MultipleCriteriaDecisionAnalysisDTO mcdaObj = new MultipleCriteriaDecisionAnalysisDTO();
        mcdaObj.setMcdaIdeas(new ArrayList<>());

        for (VCFIdeaDTO vcfIdea :vcfNiceToHaveObj.getVcfIdeas()) {
            MCDAIdeaDTO mcdaIdea = new MCDAIdeaDTO();

            mcdaIdea.setIdea(vcfIdea.getIdea());
            mcdaIdea.setVcfCriterias(vcfIdea.getVcfCriterias());

            mcdaObj.getMcdaIdeas().add(mcdaIdea);
        }
        
        return mcdaObj;
    }


    // perform MCDA analisys
    public MultipleCriteriaDecisionAnalysisDTO runMcdaAnalysis(MultipleCriteriaDecisionAnalysisDTO mcdaObj, Long vcwId, String userId) {

        // used to update the db with vcf results
        List<IdeaAndCriteriaEntity> iacs = new ArrayList<>();
        ideaAndCriteriaRepository.findByIdeaVcwHasIdeaEntityVcwId(vcwId).forEach(iacs::add);

        LocalDateTime mcdaTimestamp = LocalDateTime.now();
        for (MCDAIdeaDTO mcdaIdea: mcdaObj.getMcdaIdeas()) {

            for (VCFCriteriaDTO mcdaCriteria: mcdaIdea.getVcfCriterias()) {

                // find IdeaAndCriteriaEntity
                IdeaAndCriteriaEntity iac = iacs.stream().filter(e -> e.getCriteria().equals(mcdaCriteria.getCriteria())
                        && e.getIdea().equals(mcdaIdea.getIdea())).findAny().orElse(null);

                Float value = mcdaCriteria.getIdeaAndCriteria().getValue();
                Float intervalMin = mcdaCriteria.getVcwHasCriteria().getIntervalMin();
                Float intervalMax = mcdaCriteria.getVcwHasCriteria().getIntervalMax();
                Float weight = mcdaCriteria.getVcwHasCriteria().getWeight();

                if (intervalMin == null) {
                    if (value <= intervalMax) {
                        mcdaIdea.setSum( mcdaIdea.getSum() + weight );
                        mcdaCriteria.getIdeaAndCriteria().setMcdaResult(weight);
                    } else {
                        mcdaCriteria.getIdeaAndCriteria().setMcdaResult(.0F);
                    }
                } else if (intervalMax == null) {
                    if (value >= intervalMin) {
                        mcdaIdea.setSum( mcdaIdea.getSum() + weight);
                        mcdaCriteria.getIdeaAndCriteria().setMcdaResult(weight);
                    } else {
                        mcdaCriteria.getIdeaAndCriteria().setMcdaResult(.0F);
                    }
                } else {
                    if (value >= intervalMin && value <= intervalMax) {
                        mcdaIdea.setSum( mcdaIdea.getSum() + weight );
                        mcdaCriteria.getIdeaAndCriteria().setMcdaResult(weight);
                    } else {
                        mcdaCriteria.getIdeaAndCriteria().setMcdaResult(.0F);
                    }
                }

                iac.setMcdaResult(mcdaCriteria.getIdeaAndCriteria().getMcdaResult());
                iac.setUpdatedBy(userId);
                iac.setUpdatedAt(mcdaTimestamp);

            }
        }
        //update vcf results in the DB
        ideaAndCriteriaRepository.saveAll(iacs);

        // sort by weight sum
        mcdaObj.getMcdaIdeas().sort(Comparator.comparing(i -> -i.getSum()));

        return mcdaObj;
    }

}
