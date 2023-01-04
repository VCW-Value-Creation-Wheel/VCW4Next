package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

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

    //TODO: TEXT na bd é string ou outra coisa?
    @Column
    private String challenge;

    //TODO: TEXT na bd é string ou outra coisa?
    @Column
    private String concept;

    //TODO: jsonb na bd é string ou outra coisa
    @Column(name="value_proposition")
    private String valueProposition;

    //TODO: TEXT na bd é string ou outra coisa?
    @Column
    private String prototype;

    //TODO: TEXT na bd é string ou outra coisa?
    @Column(name="three_ms")
    private String threeMs;

    //TODO: TEXT na bd é string ou outra coisa?
    @Column(name="executive_summary")
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

    //TODO: descobrir como se faz o created_by

    @UpdateTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    //TODO: descobrir como se faz o updated_by

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
}
