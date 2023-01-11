package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "project_has_vcw")
public class ProjectHasVcwEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //TODO: isto é suposto ser zero or one to one and only one
    @OneToOne(mappedBy = "projectHasVcwEntity",optional = false)
    private VcwEntity vcw;

    //TODO: isto é suposto ser zero or many to one and only one , pls check
    @ManyToOne(optional = false)
    @JoinColumn(name="project_id", referencedColumnName = "id")
    private ProjectEntity project;
}
