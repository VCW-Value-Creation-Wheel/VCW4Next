package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "project")
public class ProjectEntity extends BaseNamedEntity{

  @Column
  private Long thumbnail;

  @Column(nullable=false)
  private String description;

  @Column(nullable=false)
  private String lang;


  @OneToOne
  @JoinColumn(name = "thumbnail", referencedColumnName = "id", insertable=false, updatable=false)
  private FileEntity file;

  @OneToMany(mappedBy = "project")
  private List<ProjectHasVcwEntity> projectHasVcwEntities = new java.util.ArrayList<>();

  @OneToMany(mappedBy = "project")
  private List<ProjectHasUserRoleEntity> projectHasUserRoleEntities = new java.util.ArrayList<>();

  @ManyToMany
  @JoinTable(
          name = "project_has_keyword",
          joinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"),
          inverseJoinColumns = @JoinColumn(name = "keyword_id", referencedColumnName = "id")
  )
  Set<KeywordEntity> projectHasKeywords = new HashSet<>();
}
