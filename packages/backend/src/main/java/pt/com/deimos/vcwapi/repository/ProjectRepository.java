package pt.com.deimos.vcwapi.repository;

import org.springframework.data.repository.CrudRepository;
import pt.com.deimos.vcwapi.entity.ProjectEntity;

import java.util.Optional;


public interface ProjectRepository extends CrudRepository<ProjectEntity, Long> {

    Iterable<ProjectEntity> findByProjectHasUserRoleEntitiesUserInum(String userId);

    Optional<ProjectEntity> findByIdAndProjectHasUserRoleEntitiesUserInum(Long projectId, String userId);
}
