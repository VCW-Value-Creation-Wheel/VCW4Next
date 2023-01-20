package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "criteria")
public class CriteriaEntity extends BaseNamedEntity{

    @Column(name = "entry_type_id", nullable = false)
    private Long entryTypeId;

    @Column(name = "source_id")
    private Long sourceId;

    @Column(name="value_type", nullable=false)
    private String valueType;


    @ManyToOne(optional = false)
    @JoinColumn(name="entry_type_id", referencedColumnName = "id", insertable=false, updatable=false)
    private EntryTypeEntity entryType;

    @OneToOne(mappedBy = "criteria", optional = false)
    private VcwHasCriteriaEntity vcwHasCriteriaEntity;

    @OneToMany(mappedBy = "criteria")
    @JsonIgnore
    private List<IdeaAndCriteriaEntity> ideasAndCriterias;

    @ManyToOne
    @JoinColumn(name="source_id", referencedColumnName = "id", insertable=false, updatable=false)
    private SourceEntity source;

    @ManyToMany
    @JoinTable(
            name = "criteria_has_keyword",
            joinColumns = @JoinColumn(name = "criteria_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "keyword_id", referencedColumnName = "id")
    )
    @JsonIgnore
    Set<KeywordEntity> criteriaHasKeywords = new HashSet<>();
}
