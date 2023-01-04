package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@Table(name = "projects")
public class ProjectEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable=false)
  private String title;

  // TODO: o que é este columnDefinition e pq so aparece no description?
  @Column(nullable=false, columnDefinition="TEXT")
  private String description;

  @Column
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

  //TODO: como fazer relaçao zero or one?
  @JoinColumn(name = "thumbnail")
  private FileEntity file;

  //TODO: como fazer relaçao to zero or many?
  @OneToMany(mappedBy = "project")
  private List<ProjectHasVcwEntity> projectHasVcwEntities;

  @OneToMany(mappedBy = "project")
  private List<ProjectHasUserRoleEntity> projectHasUserRoleEntities;


}
