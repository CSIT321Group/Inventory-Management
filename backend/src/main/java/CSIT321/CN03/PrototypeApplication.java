package CSIT321.CN03;

import CSIT321.CN03.Model.Permission;
import CSIT321.CN03.Model.Role;
import CSIT321.CN03.Model.StaffMember;
import CSIT321.CN03.Repository.PermissionRepository;
import CSIT321.CN03.Repository.RoleRepository;
import CSIT321.CN03.Repository.StaffMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

@SpringBootApplication
public class PrototypeApplication {

	@Autowired
	private StaffMemberRepository staffMemberRepository;

	public static void main(String[] args) {
		SpringApplication.run(PrototypeApplication.class, args);
	}

	//Add a new Staffmember everytime the program is executed for testing purposes
	@Bean
	public CommandLineRunner run(BCryptPasswordEncoder encoder, RoleRepository roleRepository, PermissionRepository permissionRepository) {
		return args -> {
			// create permissions
			Permission inventoryPermission = new Permission();
			inventoryPermission.setName("Inventory");
			permissionRepository.save(inventoryPermission);

			Permission orderPermission = new Permission();
			orderPermission.setName("Order");
			permissionRepository.save(orderPermission);

			Permission reportingPermission = new Permission();
			reportingPermission.setName("Reporting");
			permissionRepository.save(reportingPermission);

			Permission empInfoPermission = new Permission();
			empInfoPermission.setName("EmployeeInfo");
			permissionRepository.save(empInfoPermission);

			// create a role and assign permissions
			Role userRole = new Role();
			userRole.setName("ROLE_USER");
			userRole.setPermissions(new HashSet<>(Arrays.asList(inventoryPermission, orderPermission)));
			roleRepository.save(userRole);

			// create a staff member and assign the role
			StaffMember staffMember = new StaffMember();
			staffMember.setUserName("ba449");
			staffMember.setPassword(encoder.encode("password"));
			staffMember.setRoles(new HashSet<>(Collections.singletonList(userRole)));
			staffMemberRepository.save(staffMember);
			staffMember = staffMemberRepository.findByUserName("ba449");

			System.out.println(staffMember.getUsername());
			System.out.println(staffMember.getPassword());
			System.out.println(staffMember.getId());

			// Fetch all permissions
			List<Permission> allPermissions = permissionRepository.findAll();

			// Create admin role and assign all permissions
			Role adminRole = new Role();
			adminRole.setName("ROLE_ADMIN");
			adminRole.setPermissions(new HashSet<>(allPermissions));
			roleRepository.save(adminRole);

			// Create a staff member and assign the admin role
			StaffMember admin = new StaffMember();
			admin.setUserName("admin");
			admin.setPassword(encoder.encode("password"));
			admin.setRoles(new HashSet<>(Collections.singletonList(adminRole)));
			staffMemberRepository.save(admin);

			// Outputs for testing
			System.out.println(admin.getUsername());
			System.out.println(admin.getPassword());
			System.out.println(admin.getId());
		};
	}


}