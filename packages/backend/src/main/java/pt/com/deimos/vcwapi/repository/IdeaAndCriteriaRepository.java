package pt.com.deimos.vcwapi.repository;

import org.springframework.data.repository.CrudRepository;
import pt.com.deimos.vcwapi.entity.CriteriaEntity;
import pt.com.deimos.vcwapi.entity.IdeaAndCriteriaEntity;

public interface IdeaAndCriteriaRepository extends CrudRepository<IdeaAndCriteriaEntity, Long> {

    Iterable<IdeaAndCriteriaEntity> findByIdeaVcwHasIdeaEntityVcwId(Long vcwId);
}
