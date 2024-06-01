package pt.com.deimos.vcwapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import pt.com.deimos.vcwapi.dto.valueCreationFunnel.ValueCreationFunnelDTO;
import pt.com.deimos.vcwapi.service.ValueCreationFunnelService;

@RestController
@RequestMapping("/test/v1/projects/{project_id}/vcws/{vcw_id}/ValueCreationFunnel")
@Tag(name = "Value Creation Funnel", description = "Value Creation Funnel endpoints")
public class ValueCreationFunnelController {

    @Autowired
    ValueCreationFunnelService valueCreationFunnelService;


    //@GetMapping("/valueCreationFunnelDTO")
    //ValueCreationFunnelDTO getValueCreationFunnelDTO () {
    //    
    //    ValueCreationFunnelDTO vcfObj = valueCreationFunnelService.generateVCWValueCreationFunnelDTOObject (14L, true);
    //
    //    return vcfObj;
    //}

    @GetMapping("")
    ValueCreationFunnelDTO getOValueCreationFunnelDTO () {
        
        ValueCreationFunnelDTO vcfObj = valueCreationFunnelService.generateVCWValueCreationFunnelDTOObject (14L, true);


        ValueCreationFunnelDTO finalVcfObj = valueCreationFunnelService.runVcfAnalysis(vcfObj, 14L);

        return finalVcfObj;
    }

}
