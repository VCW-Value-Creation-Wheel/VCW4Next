package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "project_has_user_role")
public class ProjectHasUserRoleEntity extends BaseEntity{

    @Column(name = "project_id", nullable = false)
    private Long projectId;

    @Column(name = "role_id", nullable = false)
    private Long roleId;

    @Column(name="user_inum", nullable=false)
    private UUID userInum;


    ///TODO: isto é suposto ser many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name="project_id", referencedColumnName = "id", insertable=false, updatable=false)
    private ProjectEntity project;

    ///TODO: isto é suposto ser zero or many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name="role_id", referencedColumnName = "id", insertable=false, updatable=false)
    private RoleEntity role;
}
