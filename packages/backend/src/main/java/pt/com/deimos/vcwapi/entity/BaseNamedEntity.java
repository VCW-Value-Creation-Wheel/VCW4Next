package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@MappedSuperclass
@Getter
@Setter
public abstract class BaseNamedEntity extends BaseEntity implements Serializable {

    @Column(nullable=false)
    private String name;

}
