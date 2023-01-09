package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "vcw_has_idea")
public class VcwHasIdeaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Boolean selected;

    //TODO: isto é suposto ser zero or many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name="vcw_id")
    private VcwEntity vcw;

    //TODO: isto é suposto ser one and only one to one and only one, pls check
    @OneToOne(mappedBy = "vcwHasIdeaEntity", optional=false)
    private IdeaEntity idea;


}
