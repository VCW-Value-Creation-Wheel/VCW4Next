package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "idea_and_criteria")
public class IdeaAndCriteriaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Float value;

    @Column(name="value_source")
    private Integer valueSource;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "value_updated_at")
    private LocalDateTime ValueUpdatedAt;

    @Column(name="vcf_result")
    private Boolean vcfResult;

    @Column(name="mcda_result")
    private Float mcdaResult;

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


    //TODO: como se implementa zero or many
    @ManyToOne
    @JoinColumn(name="idea_id")
    private IdeaEntity idea;


    //TODO: como se implementa zero or many
    @ManyToOne
    @JoinColumn(name="criteria_id")
    private CriteriaEntity criteria;

    //TODO: como se implementa zero or onr to zero or many
    @ManyToOne
    @JoinColumn(name="source_id")
    private SourceEntity source;
}
