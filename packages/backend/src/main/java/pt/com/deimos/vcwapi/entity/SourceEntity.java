package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "source")
public class SourceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private String url;

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

    // TODO: como se implementa one or zero to zero or many?
    @OneToMany(mappedBy = "idea")
    private List<IdeaEntity> ideas;


    // TODO: como se implementa one or zero to zero or many?
    @OneToMany(mappedBy = "criteria")
    private List<CriteriaEntity> criterias;


    // TODO: como se implementa one or zero to zero or many?
    @OneToMany(mappedBy = "idea_and_criteria")
    private List<IdeaAndCriteriaEntity> ideaAndCriteriaEntities;


}
