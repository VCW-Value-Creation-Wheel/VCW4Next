package pt.com.deimos.vcwapi.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
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

    //TODO: Nos docs o @Column tem mais atributos (length, size, etc)
    //TODO: Porque é que no ProjectEntity so se usa o nullable e o updatable?
    //TODO: porque usar o nullable=false e nao o @NotNull?
    //https://www.baeldung.com/hibernate-notnull-vs-nullable
    @Column(nullable=false)
    private Integer order;

    //TODO: os tamanhos é suposto restringir se aqui tb?
    @Column(nullable=false)
    private String code;

    @Column(nullable=false)
    private String name;

    @Column
    private String description;

    @Column(name="part_of_sprint",nullable=false)
    private Boolean partOfSprint;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "phase")
    private List<VcwHasPhaseEntity> vcwHasPhaseEntities;
}
