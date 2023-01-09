package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vcw_has_phase")
public class VcwHasPhaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private Boolean started;

    @Column(nullable=false)
    private Boolean locked;

    //TODO: isto é suposto ser zero or many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name = "phase_id")
    private PhaseEntity phase;

    @ManyToOne
    @JoinColumn(name = "vcw_id")
    private VcwEntity vcw;


}