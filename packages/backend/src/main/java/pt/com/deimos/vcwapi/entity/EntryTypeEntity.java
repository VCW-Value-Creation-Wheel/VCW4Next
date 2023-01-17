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
@Table(name = "entry_type")
public class EntryTypeEntity extends BaseNamedEntity{

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "entryType")
    private List<CriteriaEntity> criterias;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "entryType")
    private List<IdeaEntity> ideas;
}
