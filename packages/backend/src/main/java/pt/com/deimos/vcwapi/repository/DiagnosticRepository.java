package pt.com.deimos.vcwapi.repository;

import org.springframework.data.repository.CrudRepository;
import pt.com.deimos.vcwapi.entity.DiagnosticEntity;

public interface DiagnosticRepository extends CrudRepository<DiagnosticEntity, Long> {
}
