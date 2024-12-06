package pt.com.deimos.vcwapi.repository;

import org.springframework.data.repository.CrudRepository;
import pt.com.deimos.vcwapi.entity.RoleEntity;

import java.util.Optional;

public interface RoleRepository extends CrudRepository<RoleEntity, Long> {


    Optional<RoleEntity> findById(Long id);

}
