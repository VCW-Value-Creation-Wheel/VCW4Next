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


    //TODO: isto é suposto ser zero or many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name="idea_id", referencedColumnName = "id", insertable=false, updatable=false)
    private IdeaEntity idea;

    //TODO: isto é suposto ser zero or many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name="criteria_id", referencedColumnName = "id", insertable=false, updatable=false)
    private CriteriaEntity criteria;

    //TODO: isto é suposto ser zero or many to zero or one, pls check
    @ManyToOne
    @JoinColumn(name="source_id", referencedColumnName = "id", insertable=false, updatable=false)
    private SourceEntity source;
}
