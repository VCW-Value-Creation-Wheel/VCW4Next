package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BusinessModelCanvasDTO {

    private String customerSegments;

    private String valuePropositions;

    private String channels;

    private String customerRelationships;

    private String revenueStreams;

    private String keyResources;

    private String keyActivities;

    private String keyPartnerships;

    private String costStructure;
}
