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
@Table(name = "project")
public class ProjectEntity extends BaseNamedEntity{

  @Column
  @JsonIgnore
  private Long thumbnail;

  @Column(nullable=false)
  private String description;

  @Column(nullable=false)
  private String lang;


  @OneToOne
  @JoinColumn(name = "thumbnail", referencedColumnName = "id", insertable=false, updatable=false)
  private FileEntity fileThumbnail;

  @ManyToMany
  @JoinTable(
          schema = "application",
          name = "project_has_vcw",
          joinColumns = @JoinColumn(
                  name = "project_id",
                  referencedColumnName = "id",
                  insertable = false,
                  updatable = false
          ),
          inverseJoinColumns = @JoinColumn(
                  name = "vcw_id",
                  referencedColumnName = "id",
                  insertable = false,
                  updatable = false
          )
  )
  private Set<VcwEntity> vcws = new HashSet<>();

  @OneToMany(mappedBy = "project")
  @JsonIgnore
  private List<ProjectHasUserRoleEntity> projectHasUserRoleEntities = new java.util.ArrayList<>();

  @ManyToMany
  @JoinTable(
          name = "project_has_keyword",
          joinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"),
          inverseJoinColumns = @JoinColumn(name = "keyword_id", referencedColumnName = "id")
  )
  @JsonIgnore
  Set<KeywordEntity> projectHasKeywords = new HashSet<>();
}
