package CSIT321.CN03;

import CSIT321.CN03.Model.*;
import CSIT321.CN03.Repository.*;
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
	@Autowired
	private WarehouseRepository warehouseRepository;
	@Autowired
	private RawMaterialRepository rawMaterialRepository;
	@Autowired
	private ConsumablesRepository consumablesRepository;
	@Autowired
	private EquipmentRepository equipmentRepository;

	public static void main(String[] args) {
		SpringApplication.run(PrototypeApplication.class, args);
	}

	//Add a new Staffmember everytime the program is executed for testing purposes
	@Bean
	public CommandLineRunner run(BCryptPasswordEncoder encoder, RoleRepository roleRepository, PermissionRepository permissionRepository) {
		return args -> {
			Warehouse warehouse = new Warehouse();
			warehouse.setWarehouse_Name("Main Warehouse");
			warehouse.setWarehouse_Address("123 Fake Street");
			warehouseRepository.save(warehouse);


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
			staffMember.setFirst_name("Brendan");
			staffMember.setLast_name("Alderton");
			staffMember.setWarehouse(warehouseRepository.findById(1L).orElse(null));
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
			admin.setFirst_name("Admin");
			admin.setLast_name("Istrator");
			admin.setWarehouse(warehouseRepository.findById(1L).orElse(null));
			admin.setPassword(encoder.encode("password"));
			admin.setRoles(new HashSet<>(Collections.singletonList(adminRole)));
			staffMemberRepository.save(admin);

			RawMaterial rm = new RawMaterial();
			rm.setUnit_price(10.0);
			rm.setStock_name("Raw Material Test");
			rm.setStock_quantity(100);
			rawMaterialRepository.save(rm);

			Consumables c = new Consumables();
			c.setStock_name("Consumable Test");
			c.setStock_quantity(44);
			c.setUnit_price(12.33);
			consumablesRepository.save(c);

			Equipment e = new Equipment();
			e.setStock_name("Equipment Test");
			e.setUnit_price(455);
			e.setStock_quantity(12);
			equipmentRepository.save(e);

			// Outputs for testing
			System.out.println(admin.getUsername());
			System.out.println(admin.getPassword());
			System.out.println(admin.getId());
		};
	}


}