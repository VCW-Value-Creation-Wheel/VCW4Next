package pt.com.deimos.vcwapi.repository;

import org.springframework.data.repository.CrudRepository;
import pt.com.deimos.vcwapi.entity.ProjectEntity;


public interface ProjectRepository extends CrudRepository<ProjectEntity, Long> {

    Iterable<ProjectEntity> findByProjectHasUserRoleEntitiesUserInum(String userId);
}
