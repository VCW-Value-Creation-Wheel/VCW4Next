package pt.com.deimos.vcwapi.repository;

import org.springframework.data.repository.CrudRepository;
import pt.com.deimos.vcwapi.entity.VcwEntity;

public interface VcwRepository extends CrudRepository<VcwEntity, Long> {

    Iterable<VcwEntity> findByProjectsProjectHasUserRoleEntitiesUserInum(String userId);

}
