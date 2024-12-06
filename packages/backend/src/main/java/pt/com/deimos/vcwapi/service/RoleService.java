package pt.com.deimos.vcwapi.service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import pt.com.deimos.vcwapi.entity.RoleEntity;
import pt.com.deimos.vcwapi.repository.RoleRepository;

@Transactional
@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository){
        this.roleRepository = roleRepository;
    }

    public Iterable<RoleEntity> findAll(){
        return this.roleRepository.findAll();
    }
    
}
