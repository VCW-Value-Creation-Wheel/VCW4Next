package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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


    @ManyToOne(optional = false)
    @JoinColumn(name="vcw_id", referencedColumnName = "id", insertable=false, updatable=false)
    @JsonIgnore
    private VcwEntity vcw;

    @OneToOne(optional = false)
    @JoinColumn(name="criteria_id", referencedColumnName = "id")
    @JsonIgnore
    private CriteriaEntity criteria;
}
