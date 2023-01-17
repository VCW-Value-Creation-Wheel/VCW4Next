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
@Table(name = "diagnostic")
public class DiagnosticEntity extends BaseNamedEntity{

    @Column(name = "vcw_id", nullable = false)
    private Long vcwId;

    @Column(name="swot_field", nullable=false)
    private String swotField;

    @Column
    private String description;


    ///TODO: isto é suposto ser zero or many to one and only one, pls check
    @ManyToOne(optional = false)
    @JoinColumn(name="vcw_id", referencedColumnName = "id", insertable=false, updatable=false)
    private VcwEntity vcw;
}
