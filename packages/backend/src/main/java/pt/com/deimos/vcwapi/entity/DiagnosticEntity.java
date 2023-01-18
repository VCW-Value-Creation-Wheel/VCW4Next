package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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


    @ManyToOne(optional = false)
    @JoinColumn(name="vcw_id", referencedColumnName = "id", insertable=false, updatable=false)
    private VcwEntity vcw;
}
