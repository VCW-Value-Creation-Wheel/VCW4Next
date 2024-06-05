package pt.com.deimos.vcwapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
public class ValueCreationFunnelService {

    @Autowired
    IdeaAndCriteriaRepository ideaAndCriteriaRepository;

    @Autowired
    VcwHasCriteriaRepository vcwHasCriteriaRepository;

    @Autowired
    VcwHasIdeaRepository vcwHasIdeaRepository;

    @Autowired
    ProjectRepository projectRepository;

    public Optional<ProjectEntity> findProjectByIdAndUser(Long project_id, String userId) {
        return this.projectRepository.findByIdAndProjectHasUserRoleEntitiesUserInum(project_id, userId);
    }


    public ValueCreationFunnelDTO generateVCWValueCreationFunnelDTOObject (Long vcwId, Boolean IsMustHave) {

        ValueCreationFunnelDTO vcfObj = new ValueCreationFunnelDTO();
        vcfObj.setVcfIdeas(new ArrayList<>());

        // get all VCW VcwHasIdeasEntities

        List<VcwHasIdeaEntity> vcwHasIdeas = new ArrayList<>();
        vcwHasIdeaRepository.findByVcwId(vcwId).forEach(vcwHasIdeas::add);

        // from it extract the selected ideas as a set

        Set<IdeaEntity> selectedIdeasSet = vcwHasIdeas
                .stream()
                .filter(ie -> ie.getSelected())
                .map(ie -> ie.getIdea())
                .collect(Collectors.toSet());

        if (selectedIdeasSet.isEmpty())
            throw new IdeasNotFoundException("No selected ideas found!");

        // get all VCW VcwHasCriteriaEntities

        List<VcwHasCriteriaEntity> vcwHasCriterias = new ArrayList<>();
        vcwHasCriteriaRepository.findByVcwId(vcwId).forEach(vcwHasCriterias::add);

        // from it extract the selected criteries as a set

        Set<CriteriaEntity> selectedCriteriasSet = vcwHasCriterias
                .stream()
                .filter(ie -> ie.getSelected())
                .map(ie -> ie.getCriteria())
                .collect(Collectors.toSet());

        if (selectedCriteriasSet.isEmpty())
            throw new CriteriasNotFoundException("No selected criterias found!");

        // get all VCW IdeaAndCriteria pairs

        List<IdeaAndCriteriaEntity> iacs = new ArrayList<>();
        ideaAndCriteriaRepository.findByIdeaVcwHasIdeaEntityVcwId(vcwId).forEach(iacs::add);

        if (iacs.isEmpty())
            throw new IdeaAndCriteriasNotFoundException("No Idea And Criteria pairs found!");

        // from the pairs get separated sets of ideas and criterias,
        // for only ideas and criterias with established pairs can be used

        Set<IdeaEntity> ideasSet = new HashSet<>();
        Set<CriteriaEntity> criteriasSet = new HashSet<>();

        iacs.forEach(iac -> {
            ideasSet.add(iac.getIdea());
            criteriasSet.add(iac.getCriteria());
        });

        // make sure only selected ideas and criterias are used
        ideasSet.retainAll(selectedIdeasSet);

        if (ideasSet.isEmpty())
            throw new IdeasNotFoundException("No selected ideas with pairs found!");

        criteriasSet.retainAll(selectedCriteriasSet);

        if (criteriasSet.isEmpty())
            throw new CriteriasNotFoundException("No selected criterias with pairs found!");

        // convert the sets to lists
        List<IdeaEntity> ideasList = new ArrayList<>(ideasSet);

        List<CriteriaEntity> criteriasList = new ArrayList<>(criteriasSet);

        // sort ideas by name

        ideasList.sort(Comparator.comparing(BaseNamedEntity::getName));

        // sort criterias based on ranking (ranking must be defined!!)

        criteriasList.sort(Comparator.comparing(c -> c.getVcwHasCriteriaEntity().getRanking()));

        // for each selected idea with pair

        ideasList.forEach( i -> {

            VCFIdeaDTO newVcfIdea = new VCFIdeaDTO();

            newVcfIdea.setIdea(i);

            newVcfIdea.setVcfCriterias(new ArrayList<>());

            // for each selected criteria with pair

            criteriasList.forEach( c -> {

                VCFCriteriaDTO newVcfCriteria = new VCFCriteriaDTO();

                newVcfCriteria.setCriteria(c);

                VcwHasCriteriaEntity vhc = vcwHasCriterias.stream()
                        .filter(e -> c.equals(e.getCriteria())).findAny().orElse(null);

                newVcfCriteria.setVcwHasCriteria(vhc);

                IdeaAndCriteriaEntity iac = iacs.stream()
                        .filter(e -> c.equals(e.getCriteria()) && i.equals(e.getIdea())).findAny().orElse(null);

                newVcfCriteria.setIdeaAndCriteria(iac);

                if (IsMustHave && "must_have".equals(vhc.getType())) {
                    newVcfIdea.getVcfCriterias().add(newVcfCriteria);
                } else if (!IsMustHave && "nice_to_have".equals(vhc.getType())) {
                    newVcfIdea.getVcfCriterias().add(newVcfCriteria);
                }

            });

            vcfObj.getVcfIdeas().add(newVcfIdea);

        });

        return vcfObj;

    }

    public ValueCreationFunnelDTO runVcfAnalysis(ValueCreationFunnelDTO vcfObj, Long vcwId, String userId) {

        LinkedList<VCFIdeaDTO> rejectedVcfIdeas = new LinkedList<>();

        ValueCreationFunnelDTO finalVcfObj = new ValueCreationFunnelDTO();

        // used to update the db with vcf results
        List<IdeaAndCriteriaEntity> iacs = new ArrayList<>();
        ideaAndCriteriaRepository.findByIdeaVcwHasIdeaEntityVcwId(vcwId).forEach(iacs::add);

        List<VCFCriteriaDTO> criterias = vcfObj.getVcfIdeas().get(0).getVcfCriterias();

        LinkedList<VCFIdeaDTO> acceptedVcfIdeas = new LinkedList<>(vcfObj.getVcfIdeas());
        LocalDateTime vcfTimestamp = LocalDateTime.now();
        int index = 0;
        for (VCFCriteriaDTO criteria : criterias) {

            List<VCFIdeaDTO> auxlist = new ArrayList<>(acceptedVcfIdeas);
            acceptedVcfIdeas = new LinkedList<>();

            for (VCFIdeaDTO idea : auxlist) {

                // find IdeaAndCriteriaEntity

                IdeaAndCriteriaEntity iac = iacs.stream().filter(e -> e.getCriteria().equals(criteria.getCriteria())
                        && e.getIdea().equals(idea.getIdea())).findAny().orElse(null);

                Float value = idea.getVcfCriterias().get(index).getIdeaAndCriteria().getValue();

                Float intervalMin = idea.getVcfCriterias().get(index).getVcwHasCriteria().getIntervalMin();

                Float intervalMax = idea.getVcfCriterias().get(index).getVcwHasCriteria().getIntervalMax();

                if (intervalMin == null) {
                    if (value <= intervalMax) {

                        acceptedVcfIdeas.addFirst(idea);
                        iac.setVcfResult(true);
                        iac.setUpdatedBy(userId);
                        iac.setUpdatedAt(vcfTimestamp);

                    } else {
                        rejectedVcfIdeas.addFirst(idea);
                        iac.setVcfResult(false);
                        iac.setUpdatedBy(userId);
                        iac.setUpdatedAt(vcfTimestamp);
                    }
                } else if (intervalMax == null) {
                    if (value >= intervalMin) {

                        acceptedVcfIdeas.addFirst(idea);
                        iac.setVcfResult(true);
                        iac.setUpdatedBy(userId);
                        iac.setUpdatedAt(vcfTimestamp);

                    } else {
                        rejectedVcfIdeas.addFirst(idea);
                        iac.setVcfResult(false);
                        iac.setUpdatedBy(userId);
                        iac.setUpdatedAt(vcfTimestamp);
                    }
                } else {
                    if (value >= intervalMin && value <= intervalMax) {

                        acceptedVcfIdeas.addFirst(idea);
                        iac.setVcfResult(true);
                        iac.setUpdatedBy(userId);
                        iac.setUpdatedAt(vcfTimestamp);

                    } else {
                        rejectedVcfIdeas.addFirst(idea);
                        iac.setVcfResult(false);
                        iac.setUpdatedBy(userId);
                        iac.setUpdatedAt(vcfTimestamp);
                    }
                }
            }

            index++;
        }

        //update vcf results in the DB
        ideaAndCriteriaRepository.saveAll(iacs);


        // concatenate
        finalVcfObj.setVcfIdeas(acceptedVcfIdeas);
        finalVcfObj.getVcfIdeas().addAll(rejectedVcfIdeas);

        return finalVcfObj;

    }

}
