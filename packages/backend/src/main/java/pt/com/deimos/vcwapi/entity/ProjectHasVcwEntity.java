package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "project_has_vcw")
public class ProjectHasVcwEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    //TODO: isto é suposto ser zero or one to one, pls check
    @OneToOne(mappedBy = "project_has_vcw")
    private VcwEntity vcw;

    //TODO: isto é suposto ser zero or many to one , pls check
    @ManyToOne
    @JoinColumn(name="project_id")
    private ProjectEntity project;
}
