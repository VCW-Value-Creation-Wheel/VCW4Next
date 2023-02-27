package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "project")
public class ProjectEntity extends BaseNamedEntity{

  public ProjectEntity(String updatedBy, String createdBy, String name,
                       String description, String lang) {
      super(updatedBy, createdBy, name);
      this.description = description;
      this.lang = lang;
  }

  //NOTE: removed thumbnail id because it was causing conflicts
  //while saving thumbnail objects with hibernate
  //if we need thumbnail in the future just do getThumbnail.getID

  @Column(nullable=false)
  private String description;

  @Column(nullable=false)
  private String lang;


  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "thumbnail", referencedColumnName = "id")
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

  @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
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


  public void addProjectHasUserRole(ProjectHasUserRoleEntity p){
     projectHasUserRoleEntities.add(p);
  }


  public void addVcw(VcwEntity vcw){
    vcws.add(vcw);
  }

  public void addKeyword(KeywordEntity keyword){
    projectHasKeywords.add(keyword);
  }



}
