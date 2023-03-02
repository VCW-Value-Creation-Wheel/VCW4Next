package pt.com.deimos.vcwapi.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.com.deimos.vcwapi.dto.ProjectHasUserRoleDTO;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.entity.ProjectHasUserRoleEntity;
import pt.com.deimos.vcwapi.entity.RoleEntity;
import pt.com.deimos.vcwapi.exceptions.BadRequestException;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.repository.ProjectHasUserRoleRepository;
import pt.com.deimos.vcwapi.repository.ProjectRepository;
import pt.com.deimos.vcwapi.repository.RoleRepository;

import java.util.Optional;


@Transactional
@Service
public class ProjectHasUserRoleService {

    private final ProjectRepository projectRepository;
    private final ProjectHasUserRoleRepository projectHasUserRoleRepository;
    private final RoleRepository roleRepository;

    public ProjectHasUserRoleService(ProjectRepository projectRepository,
                                     ProjectHasUserRoleRepository projectHasUserRoleRepository,
                                     RoleRepository roleRepository) {
        this.projectRepository = projectRepository;
        this.projectHasUserRoleRepository = projectHasUserRoleRepository;
        this.roleRepository = roleRepository;
    }

    public Optional<ProjectEntity> findProjectByIdAndUser(Long project_id, String userId) {
        return this.projectRepository.findByIdAndProjectHasUserRoleEntitiesUserInum(project_id, userId);
    }

    public Iterable<ProjectHasUserRoleEntity> findByProject(Long projectId) {
        return this.projectHasUserRoleRepository.findByProjectId(projectId);
    }

    public Optional<ProjectHasUserRoleEntity> findByIdAndProject(Long userId, Long projectId) {

        Optional<ProjectHasUserRoleEntity> result =
                this.projectHasUserRoleRepository.findByIdAndProjectId(userId, projectId);
        if (result.isEmpty())
            throw new NotFoundException("This user does not exist in this project.");

        return result;
    }


    public ProjectHasUserRoleEntity addProjectUser(ProjectEntity project,
                                       ProjectHasUserRoleDTO userDTO){

        //check if role exists before adding
        Long roleId = userDTO.getRoleId();
        Optional<RoleEntity> role = this.roleRepository.findById(roleId);
        if(role.isEmpty())
            throw new BadRequestException("Failed to add user: invalid role.");

        //create user
        ProjectHasUserRoleEntity newUser = new ProjectHasUserRoleEntity();
        newUser.setRole(role.get());
        newUser.setUserInum(userDTO.getUserId());
        newUser.setCreatedBy(userDTO.getUserId());
        newUser.setUpdatedBy(userDTO.getUserId());
        newUser.setProject(project);

        return this.projectHasUserRoleRepository.save(newUser);
    }

    public ProjectHasUserRoleEntity updateProjectUser(ProjectHasUserRoleEntity user,
           ProjectHasUserRoleDTO userDTO) {

        //check if role exists before updating
        Long roleId = userDTO.getRoleId();
        Optional<RoleEntity> role = this.roleRepository.findById(roleId);
        if(role.isEmpty())
            throw new BadRequestException("Failed to add user: invalid role.");

        //update role
        user.setRole(role.get());

        return this.projectHasUserRoleRepository.save(user);
    }

    public void delete(ProjectHasUserRoleEntity userRole) {
        this.projectHasUserRoleRepository.delete(userRole);
    }


}
