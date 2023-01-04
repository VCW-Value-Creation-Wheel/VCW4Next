package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "project_has_vcw")
public class ProjectHasVcwEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    //TODO: como fazer relaçao zero or one?
    @OneToOne(mappedBy = "project_has_vcw")
    private VcwEntity vcw;

    //TODO: como fazer relaçao to zero or many?
    @ManyToOne
    @JoinColumn(name="project_id")
    private ProjectEntity project;
}
