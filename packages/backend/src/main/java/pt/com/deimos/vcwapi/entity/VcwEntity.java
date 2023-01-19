package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "vcw")
public class VcwEntity extends BaseNamedEntity{

    @Column(name = "business_model_canvas_id")
    private Long businessModelCanvasId;

    @Column(nullable=false)
    private String type;

    @Column(columnDefinition = "TEXT")
    private String challenge;

    @Column(columnDefinition = "TEXT")
    private String concept;

    @Column(name="value_proposition", columnDefinition = "jsonb")
    private String valueProposition;

    @Column(columnDefinition = "TEXT")
    private String prototype;

    @Column(columnDefinition = "TEXT", name="three_ms")
    private String threeMs;

    @Column(columnDefinition = "TEXT", name="executive_summary")
    private String executiveSummary;

    @Column
    private Boolean closed;

    @CreationTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "closed_at")
    private LocalDateTime closedAt;

    @OneToMany(mappedBy = "vcw")
    private List<AttachmentEntity> attatchments;

    @OneToMany(mappedBy = "vcw")
    private List<DiagnosticEntity> diagnostics;

    @OneToMany(mappedBy = "vcw")
    private List<KpiEntity> kpis;

    @OneToOne
    @JoinColumn(name="business_model_canvas_id", referencedColumnName = "id", insertable=false, updatable=false)
    private BusinessModelCanvasEntity businessModelCanvas;

    @OneToMany(mappedBy = "vcw")
    private List<VcwHasCriteriaEntity> vcwHasCriteriaEntities;

    @OneToMany(mappedBy = "vcw")
    private List<VcwHasIdeaEntity> vcwHasIdeaEntities;

    //@OneToMany(mappedBy = "vcw")
    //private List<VcwHasPhaseEntity> vcwHasPhaseEntities;
}
