package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.*;

import java.io.Serializable;

@MappedSuperclass
@Getter
@Setter
@ToString
@NoArgsConstructor
public abstract class BaseNamedEntity extends BaseEntity implements Serializable {

    public BaseNamedEntity(String updatedBy, String createdBy, String name) {
        super(updatedBy, createdBy);
        this.name = name;
    }

    @Column(nullable=false)
    private String name;

}
