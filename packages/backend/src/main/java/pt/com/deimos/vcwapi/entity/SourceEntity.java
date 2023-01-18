package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "source")
public class SourceEntity extends BaseNamedEntity{

    @Column
    private String description;

    @Column
    private String url;


    @OneToMany(mappedBy = "source")
    private List<IdeaEntity> ideas;

    @OneToMany(mappedBy = "source")
    private List<CriteriaEntity> criterias;

    @OneToMany(mappedBy = "source")
    private List<IdeaAndCriteriaEntity> ideaAndCriteriaEntities;
}
