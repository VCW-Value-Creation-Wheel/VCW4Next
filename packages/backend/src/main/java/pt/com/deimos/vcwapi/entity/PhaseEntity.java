package pt.com.deimos.vcwapi.entity;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "phase")
public class PhaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // TODO: Nos docs o @Column tem mais atributos (length, size, etc)
    //Porque é que no ProjectEntity so se usa o nullable e o updatable?

    @Column(nullable=false)
    private Integer order;
    @Column(nullable=false)
    private String code;
    @Column(nullable=false)
    private String name;
    @Column
    private String description;
    @Column(name="part_of_sprint",nullable=false)
    private Boolean partOfSprint;

    @OneToMany(mappedBy = "phase")
    private List<VcwHasPhaseEntity> vcwHasPhaseEntities;


}
