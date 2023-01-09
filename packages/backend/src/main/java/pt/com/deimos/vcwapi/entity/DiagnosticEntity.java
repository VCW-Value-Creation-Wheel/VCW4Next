package pt.com.deimos.vcwapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "diagnostic")
public class DiagnosticEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="swot_field", nullable=false)
    private String swotField;

    @Column(nullable=false)
    private String title;

    @Column
    private String description;

    @CreationTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    //TODO: é assim que se faz o created_by?
    // De onde vem o uuid, há @GeneratedValue?
    @Column(name = "created_by", updatable = false)
    private UUID createdBy;

    @UpdateTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    //TODO: é assim que se faz o updated_by?
    // De onde vem o uuid, há @GeneratedValue?
    @Column(name = "updated_by")
    private UUID updatedBy;


    //TODO: como fazer relaçao to zero or many?
    @ManyToOne
    @JoinColumn(name="vcw_id")
    private VcwEntity vcw;

}
