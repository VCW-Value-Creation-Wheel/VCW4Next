package pt.com.deimos.vcwapi;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import pt.com.deimos.vcwapi.controller.ProjectController;
import pt.com.deimos.vcwapi.entity.FileEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.repository.ProjectRepository;
import pt.com.deimos.vcwapi.service.ProjectService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.not;
import static org.assertj.core.api.FactoryBasedNavigableListAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProjectServiceTest.class)
public class ProjectServiceTest {

    @Autowired
    private MockMvc mockMvc;

    private ProjectService projectService;

    @MockBean
    private ProjectRepository projectRepository;

    //add 2 dummy projects
    private List<ProjectEntity> dummyRecords = generateDummyData();

    @BeforeEach
    void setup() {
        projectService = new ProjectService(projectRepository);
    }

    private List<ProjectEntity> generateDummyData(){
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

        List<ProjectEntity> records = new ArrayList<>();
        records.add(p1);
        records.add(p2);
        return records;
    }


    @Test
    public void findAllProjectsSuccess() {

        //mock repository with dummy data
        when(projectRepository.findAll()).thenReturn(dummyRecords);

        Iterable<ProjectEntity> projectIt = projectService.findAll();
        List<ProjectEntity> projectList = new ArrayList<>();
        projectIt.forEach(projectList::add);
        assertEquals(2, projectList.size());
        assertTrue(projectList.containsAll(dummyRecords));
    }
    @Test
    public void findProjectById() {
        //mock repository with dummy data
        Optional<ProjectEntity> optionalProject = Optional.of(dummyRecords.get(0));
        when(projectRepository.findById(1L)).thenReturn(optionalProject);

        Optional<ProjectEntity> project = projectService.findById(1L);
        assertEquals(optionalProject, project);
    }

    @Test
    public void findProjectByIdNotExists()  {
        Optional<ProjectEntity> project = projectService.findById(1L);
        assertEquals(Optional.empty(),project);
    }

    @Test
    public void deleteProjectSuccess() {

        Optional<ProjectEntity> optionalProject = Optional.of(dummyRecords.get(0));
        when(projectRepository.findById(1L)).thenReturn(optionalProject);

        projectService.delete(dummyRecords.get(0));

    }

    @Test
    public void saveUpdateProjectSuccess() {

        when(projectRepository.save(dummyRecords.get(0))).thenReturn(dummyRecords.get(0));

        ProjectEntity savedProject = projectService.save(dummyRecords.get(0));
        assertEquals(savedProject.getName(),"Project 1");
        assertEquals(savedProject.getLang(),"english");
        FileEntity newFile = savedProject.getFileThumbnail();
        assertEquals(newFile.getName(),"report");
        assertEquals(newFile.getPath(),"myfiles/report.pdf");

    }


}
