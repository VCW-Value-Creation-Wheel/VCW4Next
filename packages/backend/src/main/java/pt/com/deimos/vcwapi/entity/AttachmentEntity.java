package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "attachment")
public class AttachmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "file_id", referencedColumnName = "id")
    private FileEntity file;

    @ManyToOne
    @JoinColumn(name="vcw_id")
    private VcwEntity vcw;

}
