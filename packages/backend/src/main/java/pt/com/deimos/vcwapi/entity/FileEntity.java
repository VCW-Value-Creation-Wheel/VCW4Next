package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "file")
public class FileEntity extends BaseNamedEntity{

    @Column(nullable=false)
    private String path;

    @Column(name="file_type")
    private String fileType;


    @OneToOne(mappedBy = "file", optional = false)
    private AttachmentEntity attachment;

    @JsonManagedReference
    @OneToOne(mappedBy = "file")
    private ProjectEntity project;
}
