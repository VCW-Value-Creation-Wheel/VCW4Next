package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "role")
public class RoleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @Column
    private String description;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "role")
    private List<ProjectHasUserRoleEntity> projectHasUserRoleEntities;

}
