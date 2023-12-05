package pt.com.deimos.vcwapi.repository;

import org.springframework.data.repository.CrudRepository;
import pt.com.deimos.vcwapi.entity.FileEntity;

import java.util.Optional;

public interface ThumbnailRepository extends CrudRepository<FileEntity, Long> {


    Optional<FileEntity> findById(Long id);

    Optional<FileEntity> findByProjectId(Long projectId);

    Optional<FileEntity> findByIdAndProjectId(Long id, Long projectId);

    Optional<FileEntity> findByVcwsId(Long vcwsId);    
    
    Optional<FileEntity> findByIdAndVcwsId(Long id,Long vcwsId);

}
