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

    //TODO: isto é suposto ser one and only one to one and only one, pls check
    //TODO: Há aqui muitas relaçoes com cascade mas nao sei qual tipo por
    @OneToOne(optional = false)
    @JoinColumn(name = "file_id", referencedColumnName = "id")
    private FileEntity file;

    //TODO: isto é suposto ser zero or many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name="vcw_id")
    private VcwEntity vcw;

}
