package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "vcw")
public class VcwEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String title;

    @Column(nullable=false)
    private String type;

    @Column(columnDefinition = "TEXT")
    private String challenge;

    @Column(columnDefinition = "TEXT")
    private String concept;

    //TODO: jsonb na bd é string ou outra coisa
    @Column(name="value_proposition")
    private String valueProposition;

    @Column(columnDefinition = "TEXT")
    private String prototype;

    @Column(columnDefinition = "TEXT", name="three_ms")
    private String threeMs;

    @Column(columnDefinition = "TEXT", name="executive_summary")
    private String executiveSummary;

    @Column
    private Boolean closed;

    //TODO: é suposto dar para fazer closed mais que uma vez? para saber se pomos updatable=false
    @CreationTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "closed_at")
    private LocalDateTime closedAt;

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
    @OneToOne
    @JoinColumn(name="vcw_id")
    private ProjectHasVcwEntity projectHasVcwEntity;

    // TODO: como se implementa zero or many?

    @OneToMany(mappedBy = "vcw")
    private List<AttachmentEntity> attatchments;

    // TODO: como se implementa zero or many?
    @OneToMany(mappedBy = "vcw")
    private List<DiagnosticEntity> diagnostics;

    // TODO: como se implementa zero or many?
    @OneToMany(mappedBy = "vcw")
    private List<KpiEntity> kpis;

    //TODO: como fazer relaçao zero or one?
    @OneToOne
    @JoinColumn(name="vcw_id")
    private BusinessModelCanvasEntity businessModelCanvas;

    // TODO: como se implementa zero or many?
    @OneToMany(mappedBy = "vcw")
    private List<VcwHasCriteriaEntity> vcwHasCriteriaEntities;

    // TODO: como se implementa zero or many?
    @OneToMany(mappedBy = "vcw")
    private List<VcwHasIdeaEntity> vcwHasIdeaEntities;

    @OneToMany(mappedBy = "vcw")
    private List<VcwHasPhaseEntity> vcwHasPhaseEntities;

}
