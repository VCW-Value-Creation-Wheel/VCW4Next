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
@Table(name = "kpi")
public class KpiEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "vcw_id", nullable = false)
    private Long vcwId;

    @Column
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String evaluation;

    @CreationTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "updated_by", nullable = false)
    private UUID updatedBy;

    @Column(name = "created_by", nullable = false)
    private UUID createdBy;


    //TODO: isto é suposto ser zero or many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name="vcw_id", referencedColumnName = "id", insertable=false, updatable=false)
    private VcwEntity vcw;
}
