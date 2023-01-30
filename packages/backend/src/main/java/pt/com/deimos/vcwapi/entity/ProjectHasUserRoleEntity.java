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

    @Column(name = "project_id", nullable = false)
    private Long projectId;

    @Column(name = "role_id", nullable = false)
    private Long roleId;

    @Column(name="user_inum", nullable=false)
    private String userInum;


    @ManyToOne(optional = false)
    @JoinColumn(name="project_id", referencedColumnName = "id", insertable=false, updatable=false)
    private ProjectEntity project;


    @ManyToOne(optional = false)
    @JoinColumn(name="role_id", referencedColumnName = "id", insertable=false, updatable=false)
    private RoleEntity role;
}
