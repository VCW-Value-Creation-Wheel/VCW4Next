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

    @Column(name = "vcw_id", nullable = false)
    private Long vcwId;

    @Column(name = "project_id", nullable = false)
    private Long projectId;

    //TODO: isto é suposto ser zero or one to one and only one
    @OneToOne(optional = false)
    @JoinColumn(name="vcw_id", referencedColumnName = "id", insertable=false, updatable=false)
    private VcwEntity vcw;

    //TODO: isto é suposto ser zero or many to one and only one , pls check
    @ManyToOne(optional = false)
    @JoinColumn(name="project_id", referencedColumnName = "id", insertable=false, updatable=false)
    private ProjectEntity project;
}
