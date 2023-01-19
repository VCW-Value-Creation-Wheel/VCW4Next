package pt.com.deimos.vcwapi.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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

    //TODO: os tamanhos é suposto restringir se aqui tb?
    @Column(nullable=false)
    private String code;

    @Column
    private String description;

    @Column(name="part_of_sprint",nullable=false)
    private Boolean partOfSprint;


    @OneToMany(mappedBy = "phase")
    private List<VcwHasPhaseEntity> vcwHasPhaseEntities;
}
