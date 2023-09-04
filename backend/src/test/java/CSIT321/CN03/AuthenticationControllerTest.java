package CSIT321.CN03;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Transactional
public class AuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(roles="USER")
    public void testUserAccess() throws Exception {
        this.mockMvc.perform(get("/api/test/user-test"))
                .andExpect(status().isOk())
                .andExpect(content().string("You have made it USER"));
    }

    @Test
    @WithMockUser(roles="ADMIN")
    public void testAdminAccess() throws Exception {
        this.mockMvc.perform(get("/api/test/admin-test"))
                .andExpect(status().isOk())
                .andExpect(content().string("You have made it ADMIN"));
    }

    @Test
    @WithMockUser(authorities="Inventory")
    public void testInventoryAccess() throws Exception {
        this.mockMvc.perform(get("/api/test/inventory"))
                .andExpect(status().isOk())
                .andExpect(content().string("You have access to inventory"));
    }

    @Test
    @WithMockUser(authorities="Order")
    public void testOrderAccess() throws Exception {
        this.mockMvc.perform(get("/api/test/order"))
                .andExpect(status().isOk())
                .andExpect(content().string("You have access to orders"));
    }

    @Test
    @WithMockUser(authorities="Reporting")
    public void testReportingAccess() throws Exception {
        this.mockMvc.perform(get("/api/test/reporting"))
                .andExpect(status().isOk())
                .andExpect(content().string("You have access to reporting"));
    }

    @Test
    @WithMockUser(authorities="EmployeeInfo")
    public void testEmpInfoAccess() throws Exception {
        this.mockMvc.perform(get("/api/test/empinfo"))
                .andExpect(status().isOk())
                .andExpect(content().string("You have access to employeeInfo"));
    }
}

