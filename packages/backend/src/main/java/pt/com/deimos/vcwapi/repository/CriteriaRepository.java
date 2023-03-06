package pt.com.deimos.vcwapi.repository;

import org.springframework.data.repository.CrudRepository;
import pt.com.deimos.vcwapi.entity.CriteriaEntity;

public interface CriteriaRepository extends CrudRepository<CriteriaEntity, Long> {

    Iterable<CriteriaEntity> findByVcwHasCriteriaEntityVcwId(Long vcwId);
}
