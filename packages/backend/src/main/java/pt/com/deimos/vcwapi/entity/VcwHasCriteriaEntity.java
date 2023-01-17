package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "vcw_has_criteria")
public class VcwHasCriteriaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "vcw_id", nullable = false)
    private Long vcwId;

    @Column(name = "criteria_id", nullable = false)
    private Long criteriaId;

    @Column
    private Boolean selected;

    @Column
    private String type;

    @Column
    private Integer ranking;

    @Column
    private Float weight;

    @Column(name="interval_min")
    private Float IntervalMin;

    @Column(name="interval_max")
    private Float IntervalMax;

    //TODO: isto é suposto ser zero or many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name="vcw_id", referencedColumnName = "id")
    private VcwEntity vcw;

    //TODO: isto é suposto ser one and only one to one and only one, pls check
    @OneToOne(optional = false)
    @JoinColumn(name="criteria_id", referencedColumnName = "id")
    private CriteriaEntity criteria;

}
