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
public class BusinessModelCanvasEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @CreationTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    //TODO: é assim que se faz o created_by?
    // De onde vem o uuid, há @GeneratedValue?
    @Column(name = "created_by", updatable = false)
    private UUID createdBy;

    @UpdateTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    //TODO: é assim que se faz o updated_by?
    // De onde vem o uuid, há @GeneratedValue?
    @Column(name = "updated_by")
    private UUID updatedBy;

    //TODO: isto é suposto ser zero or one to one and only one , pls check
    @OneToOne(mappedBy = "businessModelCanvas", optional = false)
    private VcwEntity vcw;

}
