package pbs.edu.rekrutacja;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import pbs.edu.rekrutacja.controllers.UserController;
import pbs.edu.rekrutacja.models.User;
import pbs.edu.rekrutacja.services.UserService;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void getAllUsers_shouldReturnListOfUsers() throws Exception {
        List<User> users = Arrays.asList(new User("John", "john@example.com", "password"),
                new User("Jane", "jane@example.com", "password"));

        when(userService.getAllUsers()).thenReturn(users);

        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].username").value("John"))
                .andExpect(jsonPath("$[1].username").value("Jane"));

        verify(userService, times(1)).getAllUsers();
        verifyNoMoreInteractions(userService);
    }

    @Test
    void getUserById_shouldReturnUser() throws Exception {
        User user = new User("John", "john@example.com", "password");

        when(userService.getUserById(1L)).thenReturn(user);

        mockMvc.perform(get("/api/users/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.username").value("John"));

        verify(userService, times(1)).getUserById(1L);
        verifyNoMoreInteractions(userService);
    }
}
