package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "project_has_user_role")
public class ProjectHasUserRoleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //TODO: é assim que se faz o user_inum?
    // De onde vem o uuid, há @GeneratedValue?
    @Column(name = "user_inum", nullable=false)
    private UUID userInum;

    @Column(nullable=false)
    private String path;

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

    ///TODO: isto é suposto ser many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name="project_id")
    private ProjectEntity project;

    ///TODO: isto é suposto ser zero or many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name="role_id")
    private RoleEntity role;

}
