package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "file")
public class FileEntity extends BaseNamedEntity{

    @Column(nullable=false)
    private String path;

    @Column(name="file_type")
    private String fileType;

    @ManyToMany(mappedBy = "attachments")
    @JsonIgnore
    Set<VcwEntity> vcws;

    @OneToOne(mappedBy = "file")
    @JsonIgnore
    private ProjectEntity project;
}
