package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "idea_and_criteria")
public class IdeaAndCriteriaEntity extends BaseEntity{

    @Column(name = "idea_id", nullable = false)
    private Long ideaId;

    @Column(name = "criteria_id", nullable = false)
    private Long criteriaId;

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


    @ManyToOne(optional = false)
    @JoinColumn(name="idea_id", referencedColumnName = "id", insertable=false, updatable=false)
    private IdeaEntity idea;

    @ManyToOne(optional = false)
    @JoinColumn(name="criteria_id", referencedColumnName = "id", insertable=false, updatable=false)
    private CriteriaEntity criteria;

    @ManyToOne
    @JoinColumn(name="source_id", referencedColumnName = "id", insertable=false, updatable=false)
    private SourceEntity source;
}
