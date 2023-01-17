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

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column
    private String url;

    @CreationTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "updated_by", nullable = false)
    private UUID updatedBy;

    @Column(name = "created_by", nullable = false)
    private UUID createdBy;


    //TODO: isto é suposto ser zero or one to zero or many, pls check
    @OneToMany(mappedBy = "source")
    private List<IdeaEntity> ideas;


    //TODO: isto é suposto ser zero or one to zero or many, pls check
    @OneToMany(mappedBy = "source")
    private List<CriteriaEntity> criterias;

    //TODO: isto é suposto ser zero or one to zero or many, pls check
    @OneToMany(mappedBy = "source")
    private List<IdeaAndCriteriaEntity> ideaAndCriteriaEntities;
}
