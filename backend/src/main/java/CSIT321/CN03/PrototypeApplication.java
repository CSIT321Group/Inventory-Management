package CSIT321.CN03;

import CSIT321.CN03.Model.*;
import CSIT321.CN03.Model.Enums.Stockroom_Type;
import CSIT321.CN03.Model.StockRoom.*;
import CSIT321.CN03.Repository.*;
import CSIT321.CN03.Service.DataInitialisation.*;
import CSIT321.CN03.Service.StockService;
import CSIT321.CN03.Service.SupplierService;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

@SpringBootApplication
@EnableCaching
public class PrototypeApplication {


	@Autowired
	private WarehouseInitializationService warehouseInitializationService;

	@Autowired
	private StaffInitializationService staffInitializationService;

	@Autowired
	private RoleInitializationService roleInitializationService;
	@Autowired
	private SupplierInitializationService supplierInitializationService;
	@Autowired
	private StockInitializationService stockInitializationService;
	@Autowired
	private OrderInitializationService orderInitializationService;

	public static void main(String[] args) {
		SpringApplication.run(PrototypeApplication.class, args);
	}

	@PostConstruct
	public void init() {
		roleInitializationService.initializeRolesAndPermissions();
		warehouseInitializationService.initializeWarehouses();
		supplierInitializationService.initializeSuppliers();
		staffInitializationService.initializeStaffMembers();
		stockInitializationService.initializeStocks();
		orderInitializationService.initializeOrders();
	}

}
