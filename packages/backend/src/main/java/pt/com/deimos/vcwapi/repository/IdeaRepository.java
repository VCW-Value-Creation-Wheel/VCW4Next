package pt.com.deimos.vcwapi.repository;

import org.springframework.data.repository.CrudRepository;
import pt.com.deimos.vcwapi.entity.IdeaEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;

public interface IdeaRepository extends CrudRepository<IdeaEntity, Long> {
}
