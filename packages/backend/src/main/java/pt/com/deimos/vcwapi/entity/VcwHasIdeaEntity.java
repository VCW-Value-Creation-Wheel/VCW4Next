package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vcw_has_idea")
public class VcwHasIdeaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Boolean selected;

    // TODO: como se implementa zero or many?
    @ManyToOne
    @JoinColumn(name="vcw_id")
    private VcwEntity vcw;


    @OneToOne(mappedBy = "vcw_has_idea")
    private IdeaEntity idea;


}
