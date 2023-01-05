package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
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

    //TODO: descobrir como se faz o created_by

    @UpdateTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    //TODO: descobrir como se faz o updated_by




    // TODO: como se implementa zero or one to zero or many?
    @ManyToOne
    @JoinColumn(name="entry_type")
    private EntryTypeEntity entryType;


    // TODO: como se implementa zero or many?
    @OneToMany(mappedBy = "idea")
    private List<IdeaAndCriteriaEntity> ideasAndCriterias;

    // TODO: como se implementa zero or one to zero or many?
    @ManyToOne
    @JoinColumn(name="source_id")
    private SourceEntity source;


    // TODO: como se implementa zero or many?

    @ManyToMany
    @JoinTable(
            name = "idea_has_keyword",
            joinColumns = @JoinColumn(name = "idea_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "keyword_id", referencedColumnName = "id")
    )
    //TODO: porque é um set aqui e nao uma lista como nas outras relaçoes?
    Set<KeywordEntity> ideaHasKeywords = new HashSet<>();



    @OneToOne
    @JoinColumn(name="idea_id")
    private VcwHasIdeaEntity vcwHasIdeaEntity;






}
