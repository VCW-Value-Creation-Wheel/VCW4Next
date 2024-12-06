package pt.com.deimos.vcwapi.dto;

import java.util.Set;

import lombok.Data;
import pt.com.deimos.vcwapi.entity.FileEntity;

@Data
public class ImplementationAndControlDTO {

    private String executiveSummary;

    private Set<FileEntity> attachment;
    
}
