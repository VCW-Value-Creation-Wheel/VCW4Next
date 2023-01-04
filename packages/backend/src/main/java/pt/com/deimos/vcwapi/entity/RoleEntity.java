package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "role")
public class RoleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @Column
    private String description;

    // TODO: como se implementa zero or many?
    @OneToMany(mappedBy = "role")
    private List<ProjectHasUserRoleEntity> projectHasUserRoleEntities;

}
