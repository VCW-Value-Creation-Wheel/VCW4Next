package pt.com.deimos.vcwapi.repository;

import org.springframework.data.repository.CrudRepository;

import pt.com.deimos.vcwapi.dto.BusinessModelCanvasDTO;
import pt.com.deimos.vcwapi.entity.BusinessModelCanvasEntity;

import java.util.Optional;

public interface BusinessModelCanvasRepository extends CrudRepository<BusinessModelCanvasEntity, Long> {

}