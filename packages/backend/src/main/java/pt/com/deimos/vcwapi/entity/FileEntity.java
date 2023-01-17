package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "file")
public class FileEntity extends BaseNamedEntity{

    @Column(nullable=false)
    private String path;

    @Column(name="file_type")
    private String fileType;

    //TODO: isto é suposto ser one and only one to one and only, pls check
    @OneToOne(mappedBy = "file", optional = false)
    private AttachmentEntity attachment;

    //TODO: isto é suposto ser zero or one to zero or one, pls check
    @OneToOne(mappedBy = "file")
    private ProjectEntity project;
}
