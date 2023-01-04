package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "project_has_user_role")
public class ProjectHasUserRoleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //TODO: user_inum é suposto ser o que e que tipo?

    @Column(nullable=false)
    private String path;
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

    @ManyToOne
    @JoinColumn(name="project_id")
    private ProjectEntity project;

    //TODO: como fazer relaçao to zero or many?
    @ManyToOne
    @JoinColumn(name="role_id")
    private RoleEntity role;

}
