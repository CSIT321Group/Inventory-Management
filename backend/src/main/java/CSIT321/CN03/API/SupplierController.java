package CSIT321.CN03.API;

import CSIT321.CN03.Model.Supplier;
import CSIT321.CN03.Service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * This class serves as a REST Controller responsible for handling supplier-related operations.
 * It provides endpoints for retrieving, saving, and querying supplier information.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/api/supplier")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    /**
     * Retrieves a supplier by their unique identifier.
     *
     * @param id The ID of the supplier to retrieve.
     * @return The supplier object with the specified ID.
     */
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping("/{id}")
    public Supplier getSupplierById(@PathVariable Long id) {
        return supplierService.getSupplierById(id);
    }

    /**
     * Retrieves a supplier by their name.
     *
     * @param name The name of the supplier to retrieve.
     * @return The supplier object with the specified name.
     */
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping("/name/{name}")
    public Supplier getSupplierByName(@PathVariable String name) {
        return supplierService.getSupplierByName(name);
    }

    /**
     * Saves a new supplier.
     *
     * @param supplier The supplier object to be saved.
     * @return The saved supplier object.
     */
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @PostMapping
    public Supplier saveSupplier(@RequestBody Supplier supplier) {
        return supplierService.saveSupplier(supplier);
    }

    /**
     * Retrieves a list of all suppliers.
     *
     * @return A list of all supplier objects in the system.
     */
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping
    public List<Supplier> getAllSuppliers() {
        return supplierService.getAllSuppliers();
    }
}
