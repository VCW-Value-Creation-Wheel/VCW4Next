/*
package pt.com.deimos.vcwapi;

import io.minio.errors.MinioException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import pt.com.deimos.vcwapi.dto.ProjectDTO;
import pt.com.deimos.vcwapi.entity.FileEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.repository.ProjectRepository;
import pt.com.deimos.vcwapi.service.ProjectService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@WebMvcTest(ProjectServiceTest.class)
public class ProjectServiceTest {

    @Autowired
    private MockMvc mockMvc;

    private ProjectService projectService;

    @MockBean
    private ProjectRepository projectRepository;

    //add 2 dummy projects
    private List<ProjectDTO> dummyRecords = generateDummyData();

    @BeforeEach
    void setup() {
        projectService = new ProjectService(projectRepository);
    }

    private List<ProjectDTO> generateDummyData(){
        ProjectEntity p1 = new ProjectEntity();
        FileEntity f = new FileEntity();
        p1.setName("Project 1");
        p1.setDescription("project 1 description");
        p1.setLang("english");
        f.setName("report");
        f.setPath("myfiles/report.pdf");
        f.setFileType("pdf");
        p1.setFileThumbnail(f);

        ProjectEntity p2 = new ProjectEntity();
        p2.setName("Project 2");
        p2.setDescription("project 2 description");
        p2.setLang("portuguese");

        ProjectDTO pDto1 = new ProjectDTO();
        BeanUtils.copyProperties(p1,pDto1);
        ProjectDTO pDto2 = new ProjectDTO();
        BeanUtils.copyProperties(p2,pDto2);
        List<ProjectDTO> records = new ArrayList<>();
        records.add(pDto1);
        records.add(pDto2);
        return records;
    }


    @Test
    public void findAllProjectsSuccess() throws MinioException {

        //mock repository with dummy data
        List<ProjectEntity> pList = new ArrayList<>();
        ProjectEntity p1 = new ProjectEntity();
        BeanUtils.copyProperties(dummyRecords.get(0),p1);
        pList.add(p1);
        BeanUtils.copyProperties(dummyRecords.get(1),p1);
        pList.add(p1);
        when(projectRepository.findAll()).thenReturn(pList);

        Iterable<ProjectEntity> results = projectService.findAll();
        List<ProjectEntity> projectList = new ArrayList<>();
        results.forEach(projectList::add);
        assertEquals(2, projectList.size());
        assertTrue(projectList.containsAll(pList));
    }
    @Test
    public void findProjectById() throws MinioException {
        //mock repository with dummy data
        ProjectEntity p1 = new ProjectEntity();
        BeanUtils.copyProperties(dummyRecords.get(0),p1);
        Optional<ProjectEntity> optionalProject = Optional.of(p1);
        when(projectRepository.findById(1L)).thenReturn(optionalProject);

        Optional<ProjectEntity> project = projectService.findById(1L);

        assertEquals(optionalProject, project);
    }

    @Test
    public void findProjectByIdNotExists() throws MinioException {
        Optional<ProjectEntity> project  = projectService.findById(1L);
        assertEquals(Optional.empty(),project);
    }

    @Test
    public void deleteProjectSuccess() {

        ProjectEntity p1 = new ProjectEntity();
        BeanUtils.copyProperties(dummyRecords.get(0),p1);
        Optional<ProjectEntity> optionalProject = Optional.of(p1);
        when(projectRepository.findById(1L)).thenReturn(optionalProject);

        projectService.delete(p1);

    }
    @Disabled("unit tests are not being used, not working because methods now have auth")
    @Test
    public void saveUpdateProjectSuccess() {

        ProjectEntity p1 = new ProjectEntity();
        BeanUtils.copyProperties(dummyRecords.get(0),p1);
        when(projectRepository.save(p1)).thenReturn(p1);

        ProjectEntity savedProject = projectService.save(dummyRecords.get(0),null);

        assertEquals(savedProject.getName(),"Project 1");
        assertEquals(savedProject.getLang(),"english");
        FileEntity newFile = savedProject.getFileThumbnail();
        assertEquals(newFile.getName(),"report");
        assertEquals(newFile.getPath(),"myfiles/report.pdf");

    }


}
*/