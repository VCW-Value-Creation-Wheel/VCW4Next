package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "project_has_user_role")
public class ProjectHasUserRoleEntity extends BaseEntity{

    @Column(name="user_inum", nullable=false)
    private String userInum;


    @ManyToOne(optional = false)
    @JoinColumn(name="project_id", referencedColumnName = "id")
    @JsonIgnore
    private ProjectEntity project;


    @ManyToOne(optional = false)
    @JoinColumn(name="role_id", referencedColumnName = "id")
    private RoleEntity role;
}
