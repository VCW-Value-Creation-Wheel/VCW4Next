package pt.com.deimos.vcwapi.entity;

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
    private List<CriteriaEntity> criterias;

    @OneToMany(mappedBy = "entryType")
    private List<IdeaEntity> ideas;
}
