package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "keyword")
public class KeywordEntity extends BaseEntity{

    @Column(nullable=false)
    private String word;

    @Column(nullable=false)
    private String lang;


    @ManyToMany(mappedBy = "ideaHasKeywords")
    Set<IdeaEntity> ideas;

    @ManyToMany(mappedBy = "criteriaHasKeywords")
    Set<CriteriaEntity> criterias;

    @ManyToMany(mappedBy = "projectHasKeywords")
    Set<ProjectEntity> projects;
}
