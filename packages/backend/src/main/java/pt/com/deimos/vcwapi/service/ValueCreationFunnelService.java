package pt.com.deimos.vcwapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.com.deimos.vcwapi.dto.valueCreationFunnel.VCFCriteriaDTO;
import pt.com.deimos.vcwapi.dto.valueCreationFunnel.VCFIdeaDTO;
import pt.com.deimos.vcwapi.dto.valueCreationFunnel.ValueCreationFunnelDTO;
import pt.com.deimos.vcwapi.entity.*;
import pt.com.deimos.vcwapi.repository.CriteriaRepository;
import pt.com.deimos.vcwapi.repository.IdeaAndCriteriaRepository;
import pt.com.deimos.vcwapi.repository.VcwHasCriteriaRepository;
import pt.com.deimos.vcwapi.repository.VcwHasIdeaRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ValueCreationFunnelService {

    @Autowired
    IdeaAndCriteriaRepository ideaAndCriteriaRepository;

    @Autowired
    CriteriaRepository criteriaRepository;

    @Autowired
    VcwHasCriteriaRepository vcwHasCriteriaRepository;

    @Autowired
    VcwHasIdeaRepository vcwHasIdeaRepository;


    public ValueCreationFunnelDTO generateVCWValueCreationFunnelDTOObject (Long vcwId, Boolean IsMustHave) {

        ValueCreationFunnelDTO vcfObj = new ValueCreationFunnelDTO();
        vcfObj.setVcfIdeas(new ArrayList<>());

        // get all VCW VcwHasCriteriaEntities

        List<VcwHasCriteriaEntity> vcwHasCriterias = new ArrayList<>();
        vcwHasCriteriaRepository.findByVcwId(vcwId).forEach(vcwHasCriterias::add);

        // from it extract the selected criteries as a set

        Set<CriteriaEntity> selectedCriteriasSet = vcwHasCriterias
                .stream()
                .filter(ie -> ie.getSelected())
                .map(ie -> ie.getCriteria())
                .collect(Collectors.toSet());

        // get all VCW VcwHasIdeasEntities

        List<VcwHasIdeaEntity> vcwHasIdeas = new ArrayList<>();
        vcwHasIdeaRepository.findByVcwId(vcwId).forEach(vcwHasIdeas::add);

        // from it extract the selected ideas as a set

        Set<IdeaEntity> selectedIdeasSet = vcwHasIdeas
                .stream()
                .filter(ie -> ie.getSelected())
                .map(ie -> ie.getIdea())
                .collect(Collectors.toSet());

        // get all VCW IdeaAndCriteria pairs

        List<IdeaAndCriteriaEntity> iacs = new ArrayList<>();
        ideaAndCriteriaRepository.findByIdeaVcwHasIdeaEntityVcwId(vcwId).forEach(iacs::add);

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
        criteriasSet.retainAll(selectedCriteriasSet);

        // convert the sets to lists
        List<IdeaEntity> ideasList = new ArrayList<>();
        ideasList.addAll(ideasSet);

        List<CriteriaEntity> criteriasList = new ArrayList<>();
        criteriasList.addAll(criteriasSet);

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

    public ValueCreationFunnelDTO runVcfAnalysis(ValueCreationFunnelDTO vcfObj, Long vcwId) {

        List<VCFIdeaDTO> acceptedVcfIdeas = new LinkedList<>();
        List<VCFIdeaDTO> rejectedVcfIdeas = new LinkedList<>();

        ValueCreationFunnelDTO finalVcfObj = new ValueCreationFunnelDTO();

        List<IdeaAndCriteriaEntity> iacs = new ArrayList<>();
        ideaAndCriteriaRepository.findByIdeaVcwHasIdeaEntityVcwId(vcwId).forEach(iacs::add);

        List<VCFCriteriaDTO> criterias = vcfObj.getVcfIdeas().get(0).getVcfCriterias();

        acceptedVcfIdeas.addAll(vcfObj.getVcfIdeas());
        int index = 0;
        for (VCFCriteriaDTO criteria : criterias) {

            System.out.println("c (" + index + "): " + criteria.getCriteria().getName());

            List<VCFIdeaDTO> auxlist = new ArrayList<>();
            auxlist.addAll(acceptedVcfIdeas);
            acceptedVcfIdeas = new LinkedList<>();

            System.out.println(" - ");

            for (VCFIdeaDTO idea : auxlist) {

                // find IdeaAndCriteriaEntity

                IdeaAndCriteriaEntity iac = iacs.stream().filter(e -> e.getCriteria().equals(criteria.getCriteria())
                        && e.getIdea().equals(idea.getIdea())).findAny().orElse(null);

                //System.out.println(iac.getIdea().getName());

                Float value = idea.getVcfCriterias().get(index).getIdeaAndCriteria().getValue();

                Float intervalMin = idea.getVcfCriterias().get(index).getVcwHasCriteria().getIntervalMin();

                Float intervalMax = idea.getVcfCriterias().get(index).getVcwHasCriteria().getIntervalMax();

                System.out.println(" --- " + idea.getIdea().getName() + "  ---   --- ");
                System.out.println(intervalMin + " " + value + " " + intervalMax);

                if (intervalMin == null) {
                    if (value <= intervalMax) {

                        ((LinkedList<VCFIdeaDTO>) acceptedVcfIdeas).addFirst(idea);
                        iac.setVcfResult(true);

                    } else {
                        ((LinkedList<VCFIdeaDTO>) rejectedVcfIdeas).addFirst(idea);
                        iac.setVcfResult(false);
                    }
                } else if (intervalMax == null) {
                    if (value >= intervalMin) {

                        ((LinkedList<VCFIdeaDTO>) acceptedVcfIdeas).addFirst(idea);
                        iac.setVcfResult(true);

                    } else {
                        ((LinkedList<VCFIdeaDTO>) rejectedVcfIdeas).addFirst(idea);
                        iac.setVcfResult(false);
                    }
                } else {
                    if (value >= intervalMin && value <= intervalMax) {

                        ((LinkedList<VCFIdeaDTO>) acceptedVcfIdeas).addFirst(idea);
                        iac.setVcfResult(true);

                    } else {
                        ((LinkedList<VCFIdeaDTO>) rejectedVcfIdeas).addFirst(idea);
                        iac.setVcfResult(false);
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


        // temp: print idea names
        finalVcfObj.getVcfIdeas().forEach(e->System.out.println(e.getIdea().getName()));

        return finalVcfObj;

    }

}
