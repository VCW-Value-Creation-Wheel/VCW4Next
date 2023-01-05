package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "criteria")
public class CriteriaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @Column(name="value_type", nullable=false)
    private String valueType;

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

    @ManyToOne
    @JoinColumn(name="entry_type")
    private EntryTypeEntity entryType;

    @OneToOne
    @JoinColumn(name="criteria_id")
    private VcwHasCriteriaEntity vcwHasCriteriaEntity;

    // TODO: como se implementa zero or many?
    @OneToMany(mappedBy = "criteria")
    private List<IdeaAndCriteria> ideasAndCriterias;

    //TODO: como se implementa zero or one
    @ManyToOne
    @JoinColumn(name="source_id")
    private SourceEntity source;

    // TODO: como se implementa zero or many?
    @OneToMany(mappedBy = "criteria")
    private List<CriteriaHasKeywordEntity> criteriaHasKeywordEntities;

}
