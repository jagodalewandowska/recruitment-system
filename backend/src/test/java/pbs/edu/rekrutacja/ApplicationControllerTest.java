package pbs.edu.rekrutacja;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import pbs.edu.rekrutacja.controllers.ApplicationController;
import pbs.edu.rekrutacja.models.Application;
import pbs.edu.rekrutacja.services.ApplicationService;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class ApplicationControllerTest {

    @Mock
    private ApplicationService applicationService;

    @InjectMocks
    private ApplicationController applicationController;

    private MockMvc mockMvc;

    @Test
    void getAllApplications() throws Exception {
        List<Application> applications = new ArrayList<>();

        when(applicationService.getAllApplications()).thenReturn(applications);

        mockMvc = MockMvcBuilders.standaloneSetup(applicationController).build();

        mockMvc.perform(get("/api/applications"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray());

    }

    @Test
    void getApplicationById() throws Exception {
        Application application = new Application();

        when(applicationService.getApplicationById(any(Long.class))).thenReturn(application);

        mockMvc = MockMvcBuilders.standaloneSetup(applicationController).build();

        mockMvc.perform(get("/api/applications/{applicationId}", 1L))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void createApplication() throws Exception {
        Application application = new Application();

        when(applicationService.createApplication(any(Application.class))).thenReturn(application);

        mockMvc = MockMvcBuilders.standaloneSetup(applicationController).build();

        mockMvc.perform(post("/api/applications")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(application)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void updateApplication() throws Exception {
        Application application = new Application();

        when(applicationService.updateApplication(any(Long.class), any(Application.class))).thenReturn(application);

        mockMvc = MockMvcBuilders.standaloneSetup(applicationController).build();

        mockMvc.perform(put("/api/applications/{applicationId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(application)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void deleteApplication() throws Exception {
        mockMvc = MockMvcBuilders.standaloneSetup(applicationController).build();

        mockMvc.perform(delete("/api/applications/{applicationId}", 1L))
                .andExpect(status().isOk());
    }
}