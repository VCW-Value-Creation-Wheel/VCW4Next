package pt.com.deimos.vcwapi.repository;

import org.springframework.data.repository.CrudRepository;
import pt.com.deimos.vcwapi.entity.VcwHasCriteriaEntity;

public interface VcwHasCriteriaRepository extends CrudRepository<VcwHasCriteriaEntity, Long> {


    Iterable<VcwHasCriteriaEntity> findByVcwId(Long vcwId);
}
