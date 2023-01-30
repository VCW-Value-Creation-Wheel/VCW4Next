package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "project_has_user_role")
public class ProjectHasUserRoleEntity extends BaseEntity{

    public ProjectHasUserRoleEntity(String updatedBy, String createdBy, Long roleId, String userInum) {
        super(updatedBy, createdBy);
        this.roleId = roleId;
        this.userInum = userInum;
    }

    //NOTE: removed project_id id because it was causing conflicts
    //while saving project objects with hibernate

    @Column(name = "role_id", nullable = false)
    private Long roleId;

    @Column(name="user_inum", nullable=false)
    private String userInum;


    @ManyToOne(optional = false)
    @JoinColumn(name="project_id", referencedColumnName = "id")
    private ProjectEntity project;


    @ManyToOne(optional = false)
    @JoinColumn(name="role_id", referencedColumnName = "id", insertable=false, updatable=false)
    private RoleEntity role;
}
