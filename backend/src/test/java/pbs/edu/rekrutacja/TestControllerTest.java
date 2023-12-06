package pbs.edu.rekrutacja;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
public class TestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testAllAccess() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/test/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("Public Content."));
    }

    @Test
    @WithMockUser(username = "testUser", roles = "USER")
    public void testUserAccess() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/test/user")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("User Content."));
    }

    @Test
    @WithMockUser(username = "testuser", roles = "MODERATOR")
    public void testModeratorAccess() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/test/mod")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("Moderator Board."));
    }

}
