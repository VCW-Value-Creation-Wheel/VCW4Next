package pt.com.deimos.vcwapi;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import pt.com.deimos.vcwapi.controller.ProjectController;
import pt.com.deimos.vcwapi.dto.ProjectDTO;
import pt.com.deimos.vcwapi.entity.FileEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.service.ProjectService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.notNullValue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProjectController.class)
public class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ObjectMapper mapper;

    @MockBean
    private ProjectService projectService;

    //add 2 dummy projects
    private List<ProjectDTO> dummyRecords = generateDummyData();


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

    @Disabled("unit tests are not being used, not working because methods now have auth")
    @Test
    @WithMockUser(username = "vcw_admin", password = "vcw_admin", roles = "admin")
    public void getAllProjectsSuccess() throws Exception {

        List<ProjectEntity> pList = new ArrayList<>();
        ProjectEntity p1 = new ProjectEntity();
        BeanUtils.copyProperties(dummyRecords.get(0),p1);
        pList.add(p1);
        BeanUtils.copyProperties(dummyRecords.get(1),p1);
        pList.add(p1);
        //mock a project object
        Mockito.when(projectService.findAll()).thenReturn(pList);

        mockMvc.perform(MockMvcRequestBuilders.get("/v1/projects")
               .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name").value("Project 1"))
                .andExpect(jsonPath("$[0].description").value("project 1 description"))
                .andExpect(jsonPath("$[0].lang").value("english"))
                .andExpect(jsonPath("$[0].file.name").value("report"))
                .andExpect(jsonPath("$[0].file.path").value("myfiles/report.pdf"))
                .andExpect(jsonPath("$[0].file.fileType").value("pdf"))
                .andExpect(jsonPath("$[1].name").value("Project 2"))
                .andExpect(jsonPath("$[1].description").value("project 2 description"))
                .andExpect(jsonPath("$[1].lang").value("portuguese"));
    }
    @Disabled("unit tests are not being used, not working because methods now have auth")
    @Test
    @WithMockUser(username = "vcw_admin", password = "vcw_admin", roles = "admin")
    public void getProjectByIdSuccess() throws Exception {

        ProjectEntity p1 = new ProjectEntity();
        BeanUtils.copyProperties(dummyRecords.get(0),p1);
        Mockito.when(projectService.findById(1L)).thenReturn(java.util.Optional.of(p1));

        mockMvc.perform(MockMvcRequestBuilders
                .get("/v1/projects/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.name").value("Project 1"));
    }

    //FIXME: this test does not work because it requires a keycloak auth token
    // Find out how to mock keycloak token
    @Disabled("not yet ready , it requires a keycloak auth token mock.")
    @Test
    public void saveProjectSuccess() throws Exception {

        ProjectEntity p1 = new ProjectEntity();
        BeanUtils.copyProperties(dummyRecords.get(0),p1);
        Mockito.when(projectService.save(dummyRecords.get(1),"")).thenReturn(p1);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/v1/projects")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(dummyRecords.get(1)));

        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.name").value("Project 2"))
                .andExpect(jsonPath("$.description").value("project 2 description"))
                .andExpect(jsonPath("$.lang").value("portuguese"));
    }

    //FIXME: this test does not work because it requires a keycloak auth token
    // Find out how to mock keycloak token
    @Disabled("not yet ready , it requires a keycloak auth token mock.")
    @Test
    public void updateProjectSuccess() throws Exception {

        ProjectEntity editedProject = new ProjectEntity();
        ProjectEntity p1 = new ProjectEntity();
        editedProject.setName("Edited project");
        ProjectDTO editedDto = new ProjectDTO();
        BeanUtils.copyProperties(editedProject,editedDto);
        BeanUtils.copyProperties(dummyRecords.get(1),p1);
        Mockito.when(projectService.save(dummyRecords.get(1),"")).thenReturn(p1);
        Mockito.when(projectService.save(editedDto,"")).thenReturn(editedProject);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.put("/v1/projects")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(editedProject));

        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.name").value("Edited project"))
                .andExpect(jsonPath("$.description").value("project 2 description"))
                .andExpect(jsonPath("$.lang").value("portuguese"));
    }

    //FIXME: this test does not work because it requires a keycloak auth token
    // Find out how to mock keycloak token
    @Disabled("not yet ready , it requires a keycloak auth token mock.")
    @Test
    public void deleteProjectSuccess() throws Exception {

        ProjectEntity p1 = new ProjectEntity();
        BeanUtils.copyProperties(dummyRecords.get(0),p1);
        Mockito.when(projectService.findById(2L)).thenReturn(Optional.of(p1));

        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/v1/projects/2")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    //FIXME: this test does not work because it requires a keycloak auth token
    // Find out how to mock keycloak token
    @Disabled("not yet ready , it requires a keycloak auth token mock.")
    @Test
    public void deleteProjectFailNotFound() throws Exception {

        Mockito.when(projectService.findById(5l)).thenReturn(null);

        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/v1/projects/5")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(result ->
                        assertTrue(result.getResolvedException() instanceof ChangeSetPersister.NotFoundException))
                .andExpect(result ->
                        assertEquals("Patient with ID 5 does not exist.", result.getResolvedException().getMessage()));
    }

}