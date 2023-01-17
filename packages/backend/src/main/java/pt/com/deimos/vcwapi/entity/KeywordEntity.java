package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "keyword")
public class KeywordEntity extends BaseEntity{

    @Column(nullable=false)
    private String word;

    @Column(nullable=false)
    private String lang;


    // TODO: como se implementa  zero or many?
    @ManyToMany(mappedBy = "ideaHasKeywords")
    Set<IdeaEntity> ideas;

    // TODO: como se implementa  zero or many?
    @ManyToMany(mappedBy = "criteriaHasKeywords")
    Set<CriteriaEntity> criterias;

    // TODO: como se implementa  zero or many?
    @ManyToMany(mappedBy = "projectHasKeywords")
    Set<ProjectEntity> projects;
}
