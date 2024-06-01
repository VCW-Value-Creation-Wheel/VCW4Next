package pt.com.deimos.vcwapi.controller.prototype;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pt.com.deimos.vcwapi.dto.valueCreationFunnel.VCFCriteriaDTO;
import pt.com.deimos.vcwapi.dto.valueCreationFunnel.VCFIdeaDTO;
import pt.com.deimos.vcwapi.dto.valueCreationFunnel.ValueCreationFunnelDTO;
import pt.com.deimos.vcwapi.entity.CriteriaEntity;
import pt.com.deimos.vcwapi.entity.IdeaAndCriteriaEntity;
import pt.com.deimos.vcwapi.entity.IdeaEntity;
import pt.com.deimos.vcwapi.entity.VcwHasCriteriaEntity;
import pt.com.deimos.vcwapi.entity.VcwHasIdeaEntity;
import pt.com.deimos.vcwapi.repository.CriteriaRepository;
import pt.com.deimos.vcwapi.repository.IdeaAndCriteriaRepository;
import pt.com.deimos.vcwapi.repository.VcwHasCriteriaRepository;
import pt.com.deimos.vcwapi.repository.VcwHasIdeaRepository;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    IdeaAndCriteriaRepository ideaAndCriteriaRepository;

    @Autowired
    CriteriaRepository criteriaRepository;

    @Autowired
    VcwHasCriteriaRepository vcwHasCriteriaRepository;

    @Autowired
    VcwHasIdeaRepository vcwHasIdeaRepository;

    @GetMapping
    String helloWorld2 () {
        return "Hello World!";
    }

    @GetMapping("/IdeaAndCriteria")
    Iterable<IdeaAndCriteriaEntity> getIdeaAndCriteriaEntity2 () {

        Iterable<IdeaAndCriteriaEntity> iacs = ideaAndCriteriaRepository.findByIdeaVcwHasIdeaEntityVcwId(14L);

        return iacs;

    }

    @GetMapping("/criterias")
    Iterable<CriteriaEntity> getCriterias () {

        Iterable<CriteriaEntity> cs = criteriaRepository.findByVcwHasCriteriaEntityVcwId(14L);



        return cs;
    }


    @GetMapping("/valueCreationFunnelDTO")
    ValueCreationFunnelDTO getValueCreationFunnelDTO () {
        
        ValueCreationFunnelDTO f = createVcfDataModel (14L, true);

        return f;
    }

    @GetMapping("/orderedValueCreationFunnelDTO")
    ValueCreationFunnelDTO getOValueCreationFunnelDTO () {
        
        ValueCreationFunnelDTO f = createVcfDataModel (14L, true);


        ValueCreationFunnelDTO of = executeVcf(f, 14L);

        return of;
    }

    ValueCreationFunnelDTO executeVcf(ValueCreationFunnelDTO f, Long vcwId) {
        List<VCFIdeaDTO> listIdeas01 = new LinkedList<>();
        List<VCFIdeaDTO> listIdeas02 = new LinkedList<>();
        ValueCreationFunnelDTO of = new ValueCreationFunnelDTO();

        List<IdeaAndCriteriaEntity> iacs = new ArrayList<>();
        ideaAndCriteriaRepository.findByIdeaVcwHasIdeaEntityVcwId(vcwId).forEach(iacs::add);

        List<VCFCriteriaDTO> criterias = f.getVcfIdeas().get(0).getVcfCriterias();

        listIdeas01.addAll(f.getVcfIdeas());
        int index = 0;
        for (VCFCriteriaDTO criteria : criterias) {

            System.out.println("c (" + index + "): " + criteria.getCriteria().getName());

            List<VCFIdeaDTO> auxlist = new ArrayList<>();
            auxlist.addAll(listIdeas01);
            listIdeas01 = new LinkedList<>();

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

                        ((LinkedList<VCFIdeaDTO>) listIdeas01).addFirst(idea);
                        iac.setVcfResult(true);

                    } else {
                        ((LinkedList<VCFIdeaDTO>) listIdeas02).addFirst(idea);
                        iac.setVcfResult(false);
                    }
                } else if (intervalMax == null) {
                    if (value >= intervalMin) {

                        ((LinkedList<VCFIdeaDTO>) listIdeas01).addFirst(idea);
                        iac.setVcfResult(true);

                    } else {
                        ((LinkedList<VCFIdeaDTO>) listIdeas02).addFirst(idea);
                        iac.setVcfResult(false);
                    }
                } else {
                    if (value >= intervalMin && value <= intervalMax) {

                        ((LinkedList<VCFIdeaDTO>) listIdeas01).addFirst(idea);
                        iac.setVcfResult(true);

                    } else {
                        ((LinkedList<VCFIdeaDTO>) listIdeas02).addFirst(idea);
                        iac.setVcfResult(false);
                    }
                }
            }

            index++;
        }

        //update vcf results in the DB
        ideaAndCriteriaRepository.saveAll(iacs);


        // concatenate
        of.setVcfIdeas(listIdeas01);
        of.getVcfIdeas().addAll(listIdeas02);


        // temp: print idea names
        of.getVcfIdeas().forEach(e->System.out.println(e.getIdea().getName()));

        return of;

    }

    ValueCreationFunnelDTO createVcfDataModel(Long vcwId, Boolean IsMustHave) {

        ValueCreationFunnelDTO f = new ValueCreationFunnelDTO();
        f.setVcfIdeas(new ArrayList<>());

        // get all VcwHasCriteriaEntities

        List<VcwHasCriteriaEntity> vcwHasCriterias = new ArrayList<>();
        vcwHasCriteriaRepository.findByVcwId(vcwId).forEach(vcwHasCriterias::add);

        // now only the selected criterias

        Set<CriteriaEntity> selectedCriteriasSet = vcwHasCriterias
                .stream()
                .filter(ie -> ie.getSelected())
                .map(ie -> ie.getCriteria())
                .collect(Collectors.toSet());

        // get all VcwHasIdeasEntities

        List<VcwHasIdeaEntity> vcwHasIdeas = new ArrayList<>();
        vcwHasIdeaRepository.findByVcwId(vcwId).forEach(vcwHasIdeas::add);

        // now only the selected ideas

        Set<IdeaEntity> selectedIdeasSet = vcwHasIdeas
                .stream()
                .filter(ie -> ie.getSelected())
                .map(ie -> ie.getIdea())
                .collect(Collectors.toSet());

        // get all pairs (idea - criteria)

        List<IdeaAndCriteriaEntity> iacs = new ArrayList<>();
        ideaAndCriteriaRepository.findByIdeaVcwHasIdeaEntityVcwId(vcwId).forEach(iacs::add);

        // from the pairs get separeted sets of ideas and criterias,
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

        ideasList.sort((i1, i2) -> i1.getName().compareTo(i2.getName()));

        // sort criterias based on ranking (ranking must be defined!!)

        criteriasList.sort((c1, c2) -> c1.getVcwHasCriteriaEntity().getRanking()
                .compareTo(c2.getVcwHasCriteriaEntity().getRanking()));

        // for each selected idea with pair

        ideasList.forEach(i -> {

            VCFIdeaDTO newIdea = new VCFIdeaDTO();

            newIdea.setIdea(i);

            newIdea.setVcfCriterias(new ArrayList<>());

            // for each criteria with pair

            criteriasList.forEach(c -> {

                VCFCriteriaDTO newCriteria = new VCFCriteriaDTO();

                newCriteria.setCriteria(c);

                VcwHasCriteriaEntity vhc = vcwHasCriterias.stream()
                        .filter(e -> c.equals(e.getCriteria())).findAny().orElse(null);

                newCriteria.setVcwHasCriteria(vhc);

                IdeaAndCriteriaEntity iac = iacs.stream()
                        .filter(e -> c.equals(e.getCriteria()) && i.equals(e.getIdea())).findAny().orElse(null);

                newCriteria.setIdeaAndCriteria(iac);

                if (IsMustHave && "must_have".equals(vhc.getType())) {
                    newIdea.getVcfCriterias().add(newCriteria);
                } else if (!IsMustHave && "nice_to_have".equals(vhc.getType())) {
                    newIdea.getVcfCriterias().add(newCriteria);
                }

            });

            f.getVcfIdeas().add(newIdea);

        });

        return f;

    }

    
}
