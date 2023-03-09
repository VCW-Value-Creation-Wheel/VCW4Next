package pt.com.deimos.vcwapi.repository;

import org.springframework.data.repository.CrudRepository;
import pt.com.deimos.vcwapi.entity.VcwHasIdeaEntity;

public interface VcwHasIdeaRepository extends CrudRepository<VcwHasIdeaEntity, Long> {


    Iterable<VcwHasIdeaEntity> findByVcwId(Long vcwId);
}
