package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "source")
public class SourceEntity extends BaseNamedEntity{

    @Column
    private String description;

    @Column
    private String url;


    //TODO: isto é suposto ser zero or one to zero or many, pls check
    @OneToMany(mappedBy = "source")
    private List<IdeaEntity> ideas;


    //TODO: isto é suposto ser zero or one to zero or many, pls check
    @OneToMany(mappedBy = "source")
    private List<CriteriaEntity> criterias;

    //TODO: isto é suposto ser zero or one to zero or many, pls check
    @OneToMany(mappedBy = "source")
    private List<IdeaAndCriteriaEntity> ideaAndCriteriaEntities;
}
