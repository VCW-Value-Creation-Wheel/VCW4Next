package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "business_model_canvas")
public class BusinessModelCanvasEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //TODO: TEXT na bd é string ou outra coisa?
    @Column(name="customer_segments")
    private String CustomerSegments;

    //TODO: TEXT na bd é string ou outra coisa?
    @Column(name="value_propositions")
    private String ValuePropositions;

    //TODO: TEXT na bd é string ou outra coisa?
    @Column
    private String channels;

    //TODO: TEXT na bd é string ou outra coisa?
    @Column(name="customer_relationships")
    private String CustomerRelationships;

    //TODO: TEXT na bd é string ou outra coisa?
    @Column(name="revenue_streams")
    private String RevenueStreams;

    //TODO: TEXT na bd é string ou outra coisa?
    @Column(name="key_resources")
    private String KeyResources;

    //TODO: TEXT na bd é string ou outra coisa?
    @Column(name="key_activities")
    private String KeyActivities;

    //TODO: TEXT na bd é string ou outra coisa?
    @Column(name="key_partnerships")
    private String KeyPartnerships;

    //TODO: TEXT na bd é string ou outra coisa?
    @Column(name="code_structure")
    private String CodeStructure;

    @Column(nullable=false)
    private String path;
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


    //TODO: como fazer relaçao zero or one?
    @OneToOne(mappedBy = "business_model_canvas")
    private VcwEntity vcw;

}
