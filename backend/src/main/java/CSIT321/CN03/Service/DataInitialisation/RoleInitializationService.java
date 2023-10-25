package CSIT321.CN03.Service.DataInitialisation;

import CSIT321.CN03.Model.Employee.Permission;
import CSIT321.CN03.Model.Employee.Role;
import CSIT321.CN03.Repository.Employee.PermissionRepository;
import CSIT321.CN03.Repository.Employee.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;

@Service
public class RoleInitializationService {

    @Autowired
    private PermissionRepository permissionRepository;
    @Autowired
    private RoleRepository roleRepository;

    public void initializeRolesAndPermissions() {
        // Create permissions
        Permission inventoryPermission = createPermission("Inventory");
        Permission orderPermission = createPermission("Order");
        Permission reportingPermission = createPermission("Reporting");
        Permission empInfoPermission = createPermission("EmployeeInfo");

        // Create roles
        Role userRole = createUserRole(inventoryPermission, orderPermission);
        Role adminRole = createAdminRole(inventoryPermission, orderPermission, reportingPermission, empInfoPermission);
    }

    private Permission createPermission(String name) {
        Permission permission = new Permission();
        permission.setName(name);
        return permissionRepository.save(permission);
    }

    private Role createUserRole(Permission... permissions) {
        Role userRole = new Role();
        userRole.setName("ROLE_USER");
        userRole.setPermissions(new HashSet<>(Arrays.asList(permissions)));
        return roleRepository.save(userRole);
    }

    private Role createAdminRole(Permission... permissions) {
        Role adminRole = new Role();
        adminRole.setName("ROLE_ADMIN");
        adminRole.setPermissions(new HashSet<>(Arrays.asList(permissions)));
        return roleRepository.save(adminRole);
    }
}

