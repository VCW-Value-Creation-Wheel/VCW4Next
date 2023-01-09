package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

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

    @ManyToOne
    @JoinColumn(name="entry_type")
    private EntryTypeEntity entryType;

    @OneToOne
    @JoinColumn(name="criteria_id")
    private VcwHasCriteriaEntity vcwHasCriteriaEntity;

    // TODO: como se implementa zero or many?
    @OneToMany(mappedBy = "criteria")
    private List<IdeaAndCriteriaEntity> ideasAndCriterias;

    //TODO: como se implementa zero or one
    @ManyToOne
    @JoinColumn(name="source_id")
    private SourceEntity source;

    // TODO: como se implementa zero or many?

    @ManyToMany
    @JoinTable(
            name = "criteria_has_keyword",
            joinColumns = @JoinColumn(name = "criteria_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "keyword_id", referencedColumnName = "id")
    )
    //TODO: porque é um set aqui e nao uma lista como nas outras relaçoes?
    Set<KeywordEntity> criteriaHasKeywords = new HashSet<>();

}
