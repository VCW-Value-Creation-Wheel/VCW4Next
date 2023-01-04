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

    // TODO: como se implementa zero or many?
    @ManyToOne
    @JoinColumn(name = "phase_id")
    private PhaseEntity phase;

    @ManyToOne
    @JoinColumn(name = "vcw_id")
    private VcwEntity vcw;


}