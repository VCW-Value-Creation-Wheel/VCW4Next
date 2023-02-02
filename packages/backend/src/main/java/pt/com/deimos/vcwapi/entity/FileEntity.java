package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "file")
public class FileEntity extends BaseNamedEntity{

    public FileEntity(String updatedBy, String createdBy, String name, String path, String fileType) {
        super(updatedBy, createdBy, name);
        this.path = path;
        this.fileType = fileType;
    }

    @Column(nullable=false)
    private String path;

    @Column(name="file_type")
    private String fileType;

    @ManyToMany(mappedBy = "attachments")
    @JsonIgnore
    Set<VcwEntity> vcws;

    @OneToOne(mappedBy = "fileThumbnail")
    @JsonIgnore
    private ProjectEntity project;
}
