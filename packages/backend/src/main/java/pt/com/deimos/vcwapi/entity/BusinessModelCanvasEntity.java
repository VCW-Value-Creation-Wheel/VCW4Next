package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "business_model_canvas")
public class BusinessModelCanvasEntity extends BaseEntity {

    @Column(name="customer_segments", columnDefinition = "TEXT")
    private String CustomerSegments;

    @Column(name="value_propositions", columnDefinition = "TEXT")
    private String ValuePropositions;

    @Column(columnDefinition = "TEXT")
    private String channels;

    @Column(name="customer_relationships", columnDefinition = "TEXT")
    private String CustomerRelationships;

    @Column(name="revenue_streams", columnDefinition = "TEXT")
    private String RevenueStreams;

    @Column(name="key_resources", columnDefinition = "TEXT")
    private String KeyResources;

    @Column(name="key_activities", columnDefinition = "TEXT")
    private String KeyActivities;

    @Column(name="key_partnerships", columnDefinition = "TEXT")
    private String KeyPartnerships;

    @Column(name="cost_structure", columnDefinition = "TEXT")
    private String CostStructure;

    @OneToOne(mappedBy = "businessModelCanvas", optional = false)
    private VcwEntity vcw;
}

