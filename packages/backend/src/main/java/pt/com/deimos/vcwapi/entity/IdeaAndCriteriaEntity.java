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

    //TODO: é assim que se faz o created_by?
    // De onde vem o uuid, há @GeneratedValue?
    @Column(name = "created_by", updatable = false)
    private String createdBy;

    @UpdateTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    //TODO: é assim que se faz o updated_by?
    // De onde vem o uuid, há @GeneratedValue?
    @Column(name = "updated_by")
    private String updatedBy;


    //TODO: isto é suposto ser zero or many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name="idea_id", referencedColumnName = "id")
    private IdeaEntity idea;

    //TODO: isto é suposto ser zero or many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name="criteria_id", referencedColumnName = "id")
    private CriteriaEntity criteria;

    //TODO: isto é suposto ser zero or many to zero or one, pls check
    @ManyToOne
    @JoinColumn(name="source_id", referencedColumnName = "id")
    private SourceEntity source;
}
