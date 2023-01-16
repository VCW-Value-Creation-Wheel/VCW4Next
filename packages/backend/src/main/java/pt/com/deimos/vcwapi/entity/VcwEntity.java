package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
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

    //TODO: é suposto dar para fazer closed mais que uma vez? para saber se pomos updatable=false
    @CreationTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "closed_at")
    private LocalDateTime closedAt;

    @CreationTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    //TODO: isto é suposto ser one and only one to zero or one
    @OneToOne(mappedBy = "vcw")
    private ProjectHasVcwEntity projectHasVcwEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "vcw")
    private List<AttachmentEntity> attatchments;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "vcw")
    private List<DiagnosticEntity> diagnostics;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "vcw")
    private List<KpiEntity> kpis;

    //TODO: isto é suposto ser one and only one to zero or one, pls check
    @OneToOne
    @JoinColumn(name="business_model_canvas_id", referencedColumnName = "id")
    private BusinessModelCanvasEntity businessModelCanvas;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "vcw")
    private List<VcwHasCriteriaEntity> vcwHasCriteriaEntities;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "vcw")
    private List<VcwHasIdeaEntity> vcwHasIdeaEntities;

    //TODO: isto é suposto ser one and only one to one or many
    // mas nao da para por optional=false, como dizemos que é mandatory?
    @OneToMany(mappedBy = "vcw")
    private List<VcwHasPhaseEntity> vcwHasPhaseEntities;

    //TODO: isto é suposto ser zero or many to one and only one, pls check
    //TODO: é assim que se faz o updated_by?
    @ManyToOne(optional = false)
    @JoinColumn(name="updated_by", referencedColumnName = "id")
    private UserEntity updatedBy;

    //TODO: isto é suposto ser zero or many to one and only one, pls check
    //TODO: é assim que se faz o created_by?
    @ManyToOne(optional = false)
    @JoinColumn(name="created_by", referencedColumnName = "id")
    private UserEntity createdBy;

}
