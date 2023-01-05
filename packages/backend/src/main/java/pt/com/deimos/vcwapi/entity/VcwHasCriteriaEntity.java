package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vcw_has_criteria")
public class VcwHasCriteriaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    //TODO: como fazer relaçao to zero or many?
    @ManyToOne
    @JoinColumn(name="vcw_id")
    private VcwEntity vcw;

    @OneToOne(mappedBy = "vcw_has_criteria")
    private CriteriaEntity criteria;



}
