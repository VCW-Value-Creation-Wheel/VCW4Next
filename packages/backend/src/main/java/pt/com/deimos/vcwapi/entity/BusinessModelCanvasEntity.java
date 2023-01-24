package pt.com.deimos.vcwapi.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "business_model_canvas")
public class BusinessModelCanvasEntity extends BaseEntity {

    @Column(name="customer_segments", columnDefinition = "TEXT")
    private String customerSegments;

    @Column(name="value_propositions", columnDefinition = "TEXT")
    private String valuePropositions;

    @Column(columnDefinition = "TEXT")
    private String channels;

    @Column(name="customer_relationships", columnDefinition = "TEXT")
    private String customerRelationships;

    @Column(name="revenue_streams", columnDefinition = "TEXT")
    private String revenueStreams;

    @Column(name="key_resources", columnDefinition = "TEXT")
    private String keyResources;

    @Column(name="key_activities", columnDefinition = "TEXT")
    private String keyActivities;

    @Column(name="key_partnerships", columnDefinition = "TEXT")
    private String keyPartnerships;

    @Column(name="cost_structure", columnDefinition = "TEXT")
    private String costStructure;

    @OneToOne(mappedBy = "businessModelCanvas", optional = false)
    private VcwEntity vcw;
}

