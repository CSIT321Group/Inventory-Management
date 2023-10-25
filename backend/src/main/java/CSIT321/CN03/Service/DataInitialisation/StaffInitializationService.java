package CSIT321.CN03.Service.DataInitialisation;

import CSIT321.CN03.Model.Employee.Role;
import CSIT321.CN03.Model.Employee.StaffMember;
import CSIT321.CN03.Model.Warehouse;
import CSIT321.CN03.Repository.Employee.RoleRepository;
import CSIT321.CN03.Repository.Employee.StaffMemberRepository;
import CSIT321.CN03.Repository.WarehouseRepository;
import CSIT321.CN03.Utils.StockSimulationUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Random;

@Service
@Transactional
public class StaffInitializationService {

    @Autowired
    private StaffMemberRepository staffMemberRepository;
    @Autowired
    private WarehouseRepository warehouseRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private BCryptPasswordEncoder encoder;

    public void initializeStaffMembers() {
        Warehouse warehouse = warehouseRepository.findById(1L).orElse(null);

        StaffMember staffMember = createStaffMember("ba449", "Brendan", "Alderton", "password", "ROLE_USER", encoder, warehouse);
        StaffMember admin = createStaffMember("admin", "Admin", "Istrator", "password", "ROLE_ADMIN", encoder, warehouse);

        // Generating 20 staff members
        Random random = new Random();
        for (int i = 0; i < 20; i++) {
            String firstName = StockSimulationUtils.COMMON_FIRST_NAMES.get(random.nextInt(StockSimulationUtils.COMMON_FIRST_NAMES.size()));
            String lastName = StockSimulationUtils.COMMON_LAST_NAMES.get(random.nextInt(StockSimulationUtils.COMMON_LAST_NAMES.size()));
            String username = (firstName + lastName).toLowerCase().substring(0, Math.min(7, (firstName + lastName).length())); //max 7 characters
            String password = "password"; // You can randomize this if needed
            String roleName = "ROLE_USER";
            createStaffMember(username, firstName, lastName, password, roleName, encoder, warehouse);
        }
    }

    private StaffMember createStaffMember(String username, String firstName, String lastName, String password, String roleName, BCryptPasswordEncoder encoder, Warehouse warehouse) {
        StaffMember staffMember = new StaffMember();
        staffMember.setUserName(username);
        staffMember.setFirst_name(firstName);
        staffMember.setLast_name(lastName);
        staffMember.setWarehouse(warehouse);
        staffMember.setPassword(encoder.encode(password));

        Role role = roleRepository.findByName(roleName);
        if (role != null) {
            staffMember.setRoles(new HashSet<>(Collections.singletonList(role)));
        }

        return staffMemberRepository.save(staffMember);
    }
}

