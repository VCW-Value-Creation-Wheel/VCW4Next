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
public class EntryTypeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @CreationTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "entryType")
    private List<CriteriaEntity> criterias;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "entryType")
    private List<IdeaEntity> ideas;

    //TODO: isto é suposto ser zero or many to one and only one, pls check
    //TODO: é assim que se faz o updated_by?
    @ManyToOne(optional = false)
    @JoinColumn(name="updated_by", referencedColumnName = "id")
    private UserEntity updatedBy;

    //TODO: isto é suposto ser zero or many to one and only one, pls check
    //TODO: é assim que se faz o created_by?
    @ManyToOne(optional = false)
    @JoinColumn(name="created_by", referencedColumnName = "id")
    private UserEntity createdBy;

}
