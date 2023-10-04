package CSIT321.CN03.API;

import CSIT321.CN03.Model.Supplier;
import CSIT321.CN03.Service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/api/supplier")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping("/{id}")
    public Supplier getSupplierById(@PathVariable Long id) {
        return supplierService.getSupplierById(id);
    }

    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping("/name/{name}")
    public Supplier getSupplierByName(@PathVariable String name) {
        return supplierService.getSupplierByName(name);
    }

    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @PostMapping
    public Supplier saveSupplier(@RequestBody Supplier supplier) {
        return supplierService.saveSupplier(supplier);
    }

    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping
    public List<Supplier> getAllSuppliers() {
        return supplierService.getAllSuppliers();
    }
}
