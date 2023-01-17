package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "attachment")
public class AttachmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "vcw_id", nullable = false)
    private Long vcwId;

    @Column(name = "file_id", nullable = false)
    private Long fileId;

    //TODO: isto é suposto ser one and only one to one and only one, pls check
    //TODO: Há aqui muitas relaçoes com cascade mas nao sei qual tipo por
    @OneToOne(optional = false)
    @JoinColumn(name = "file_id", referencedColumnName = "id", insertable=false, updatable=false)
    private FileEntity file;

    //TODO: isto é suposto ser zero or many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name="vcw_id", referencedColumnName = "id", insertable=false, updatable=false)
    private VcwEntity vcw;

}
