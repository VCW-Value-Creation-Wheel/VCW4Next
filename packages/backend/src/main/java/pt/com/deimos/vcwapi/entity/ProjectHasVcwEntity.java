package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
@Table(name = "project_has_vcw")
public class ProjectHasVcwEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "vcw_id", nullable = false)
    private Long vcwId;

    @Column(name = "project_id", nullable = false)
    private Long projectId;


    @OneToOne(optional = false)
    @JoinColumn(name="vcw_id", referencedColumnName = "id", insertable=false, updatable=false)
    private VcwEntity vcw;

    @ManyToOne(optional = false)
    @JoinColumn(name="project_id", referencedColumnName = "id", insertable=false, updatable=false)
    private ProjectEntity project;
}
