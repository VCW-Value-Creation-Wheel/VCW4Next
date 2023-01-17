package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "vcw_has_phase")
public class VcwHasPhaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "vcw_id", nullable = false)
    private Long vcwId;

    @Column(name = "phase_id", nullable = false)
    private Long phaseId;

    @Column(nullable=false)
    private Boolean started;

    @Column(nullable=false)
    private Boolean locked;

    //TODO: isto é suposto ser zero or many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name = "phase_id", referencedColumnName = "id")
    private PhaseEntity phase;

    //TODO: isto é suposto ser one or many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name = "vcw_id", referencedColumnName = "id")
    private VcwEntity vcw;


}