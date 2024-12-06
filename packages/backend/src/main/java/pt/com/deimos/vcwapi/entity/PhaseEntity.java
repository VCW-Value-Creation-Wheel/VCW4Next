package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "phase")
public class PhaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private Integer order;

    @Column(nullable=false)
    private String code;

    @Column
    private String description;

    @Column(name="part_of_sprint",nullable=false)
    private Boolean partOfSprint;

    
    @OneToMany(mappedBy = "phase")
    private Set<VcwHasPhaseEntity> vcwPhases  = new HashSet<>();
}
