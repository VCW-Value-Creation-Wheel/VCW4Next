package pt.com.deimos.vcwapi.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pt.com.deimos.vcwapi.dto.BusinessModelCanvasDTO;
import pt.com.deimos.vcwapi.entity.BusinessModelCanvasEntity;
import pt.com.deimos.vcwapi.repository.BusinessModelCanvasRepository;

@Transactional
@Service
public class BusinessModelCanvasService {

    @Autowired
    private BusinessModelCanvasRepository businessModelCanvasRepository;

    public BusinessModelCanvasEntity saveBusinessModel(BusinessModelCanvasDTO businessModelCanvasDTO){
        BusinessModelCanvasEntity businessModelCanvasEntity = new BusinessModelCanvasEntity();
        BeanUtils.copyProperties(businessModelCanvasDTO, businessModelCanvasEntity);
        return this.businessModelCanvasRepository.save(businessModelCanvasEntity);
    }

    public BusinessModelCanvasEntity updateBusinessModel(Long businessModelId,BusinessModelCanvasDTO businessModelCanvasDTO){
        BusinessModelCanvasEntity businessModelCanvasEntity = this.businessModelCanvasRepository.findById(businessModelId).get();
        BeanUtils.copyProperties(businessModelCanvasDTO, businessModelCanvasEntity);
        return this.businessModelCanvasRepository.save(businessModelCanvasEntity);
    }
    
}
