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
@Table(name = "idea")
public class IdeaEntity extends BaseNamedEntity{

    @Column(name = "entry_type_id")
    private Long entryTypeId;

    //NOTE: removed source_id because it was causing conflicts
    //while saving idea objects with hibernate

    @ManyToOne(optional = false)
    @JoinColumn(name="entry_type_id", referencedColumnName = "id", insertable=false, updatable=false)
    private EntryTypeEntity entryType;

    @OneToMany(mappedBy = "idea")
    @JsonIgnore
    private List<IdeaAndCriteriaEntity> ideasAndCriterias;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="source_id", referencedColumnName = "id")
    private SourceEntity source;

    @ManyToMany
    @JoinTable(
            name = "idea_has_keyword",
            joinColumns = @JoinColumn(name = "idea_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "keyword_id", referencedColumnName = "id")
    )
    @JsonIgnore
    Set<KeywordEntity> ideaHasKeywords = new HashSet<>();

    @OneToOne(mappedBy = "idea", optional = false, cascade = CascadeType.ALL)
    private VcwHasIdeaEntity vcwHasIdeaEntity;
}
