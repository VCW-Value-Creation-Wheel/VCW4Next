package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@MappedSuperclass
@Getter
@Setter
@ToString
public abstract class BaseNamedEntity extends BaseEntity implements Serializable {

    @Column(nullable=false)
    private String name;

}
