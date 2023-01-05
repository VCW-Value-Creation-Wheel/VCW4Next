package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "keyword")
public class KeywordEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String word;

    @Column(nullable=false)
    private String lang;

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



    // TODO: como se implementa  zero or many?
    @OneToMany(mappedBy = "idea_has_keyword")
    private List<IdeaHasKeywordEntity> ideaHasKeywordEntities;


    // TODO: como se implementa  zero or many?
    @OneToMany(mappedBy = "criteria_has_keyword")
    private List<CriteriaHasKeywordEntity> criteriaHasKeywordEntities;


    // TODO: como se implementa  zero or many?
    @OneToMany(mappedBy = "project_has_keyword")
    private List<ProjectHasKeywordEntity> projectHasKeywordEntities;
}
