package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "idea")
public class IdeaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @CreationTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    //TODO: isto é suposto ser zero or many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name="entry_type_id", referencedColumnName = "id")
    private EntryTypeEntity entryType;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "idea")
    private List<IdeaAndCriteriaEntity> ideasAndCriterias;

    //TODO: isto é suposto ser zero or many to zero or one, pls check
    @ManyToOne
    @JoinColumn(name="source_id", referencedColumnName = "id")
    private SourceEntity source;

    //TODO: isto é suposto ser Many to many, pls check
    // (one and only one to zero or many <-> idea_has_keyword <-> zero or many to one and only one)
    // In the db, idea_has_keyword has an id. Is the join table enough?
    // or do we need to create a new entity for it
    @ManyToMany
    @JoinTable(
            name = "idea_has_keyword",
            joinColumns = @JoinColumn(name = "idea_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "keyword_id", referencedColumnName = "id")
    )
    //TODO: porque é um set aqui e nao uma lista como nas outras relaçoes?
    Set<KeywordEntity> ideaHasKeywords = new HashSet<>();


    //TODO: isto é suposto ser one and only one to one and only one, pls check
    @OneToOne(mappedBy = "idea", optional = false)
    private VcwHasIdeaEntity vcwHasIdeaEntity;

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
