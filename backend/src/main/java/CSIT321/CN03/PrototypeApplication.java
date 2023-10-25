package CSIT321.CN03;

import CSIT321.CN03.Service.DataInitialisation.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

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
