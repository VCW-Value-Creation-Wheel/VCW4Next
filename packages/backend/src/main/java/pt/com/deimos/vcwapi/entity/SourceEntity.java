package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private List<IdeaEntity> ideas;

    @OneToMany(mappedBy = "source")
    @JsonIgnore
    private List<CriteriaEntity> criterias;

    @OneToMany(mappedBy = "source")
    @JsonIgnore
    private List<IdeaAndCriteriaEntity> ideaAndCriteriaEntities;
}
