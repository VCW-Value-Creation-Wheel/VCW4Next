package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(name = "vcw_id", nullable = false)
    private Long vcwId;

    //NOTE: removed idea_id id because it was causing conflicts
    //while saving idea objects with hibernate

    @Column
    private Boolean selected;

    @ManyToOne(optional = false)
    @JoinColumn(name="vcw_id", referencedColumnName = "id", insertable=false, updatable=false)
    @JsonIgnore
    private VcwEntity vcw;

    @OneToOne(optional=false)
    @JoinColumn(name="idea_id", referencedColumnName = "id")
    @JsonIgnore
    private IdeaEntity idea;

}
