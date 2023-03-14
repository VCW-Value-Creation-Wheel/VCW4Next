package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
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
    private List<IdeaEntity> ideas = new ArrayList<>();

    @OneToMany(mappedBy = "source")
    @JsonIgnore
    private List<CriteriaEntity> criterias;

    @OneToMany(mappedBy = "source")
    @JsonIgnore
    private List<IdeaAndCriteriaEntity> ideaAndCriteriaEntities;

    public void addIdea(IdeaEntity idea){this.ideas.add(idea);}


    public void removeIdea(IdeaEntity idea){
        this.ideas.remove(idea);
    }
}
