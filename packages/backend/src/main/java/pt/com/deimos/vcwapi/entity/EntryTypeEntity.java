package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "entry_type")
public class EntryTypeEntity extends BaseNamedEntity{

    @OneToMany(mappedBy = "entryType")
    @JsonIgnore
    private List<CriteriaEntity> criterias;

    @OneToMany(mappedBy = "entryType")
    @JsonIgnore
    private List<IdeaEntity> ideas;
}
