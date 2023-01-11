package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
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
//TODO: para que precisamos do Tostring?
@ToString
@Table(name = "project")
public class ProjectEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable=false)
  private String title;

  @Column(nullable=false)
  private String description;

  @Column(nullable=false)
  private String lang;

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

  //TODO: isto é suposto ser zero or one to zero or one, pls check
  @OneToOne
  @JoinColumn(name = "thumbnail", referencedColumnName = "id")
  private FileEntity file;

  //TODO: é possivel fazer uma join table aqui? a tabela so tem ids mas este nao é many to many
  //TODO: isto é suposto ser one and only one to zero or many, pls check
  @OneToMany(mappedBy = "project")
  private List<ProjectHasVcwEntity> projectHasVcwEntities = new java.util.ArrayList<>();

  //TODO: isto é suposto ser one and only one to one or many
  // mas nao da para por optional=false, como dizemos que é mandatory?
  @OneToMany(mappedBy = "project")
  private List<ProjectHasUserRoleEntity> projectHasUserRoleEntities = new java.util.ArrayList<>();

  //TODO: isto é suposto ser Many to many, pls check
  // (one and only one to zero or many <-> idea_has_keyword <-> zero or many to one and only one)
  // In the db, idea_has_keyword has an id. Is the join table enough?
  // or do we need to create a new entity for it
  @ManyToMany
  @JoinTable(
          name = "project_has_keyword",
          joinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"),
          inverseJoinColumns = @JoinColumn(name = "keyword_id", referencedColumnName = "id")
  )
  //TODO: porque é um set aqui e nao uma lista como nas outras relaçoes?
  Set<KeywordEntity> projectHasKeywords = new HashSet<>();

  public void setProjectHasVcwEntities(List<ProjectHasVcwEntity> projectHasVcwEntities) {
    this.projectHasVcwEntities = projectHasVcwEntities;
  }


}
