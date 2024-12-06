package pt.com.deimos.vcwapi.repository;

import org.springframework.data.repository.CrudRepository;
import pt.com.deimos.vcwapi.entity.ProjectHasUserRoleEntity;

import java.util.Optional;

public interface ProjectHasUserRoleRepository extends CrudRepository<ProjectHasUserRoleEntity, Long> {


    Optional<ProjectHasUserRoleEntity> findById(Long id);

    Iterable<ProjectHasUserRoleEntity> findByProjectId(Long projectId);

    Optional<ProjectHasUserRoleEntity> findByIdAndProjectId(Long id, Long projectId);
}
