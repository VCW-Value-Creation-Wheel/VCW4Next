package pt.com.deimos.vcwapi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BusinessModelCanvasDTO {

    private String customer_segments;

    private String value_propositions;

    private String channels;

    private String customer_relationships;

    private String revenue_streams;

    private String key_resources;

    private String key_activities;

    private String key_partnerships;

    private String cost_structure;
}
