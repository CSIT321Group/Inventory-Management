package CSIT321.CN03.Service.DataInitialisation;

import CSIT321.CN03.Model.Supplier;
import CSIT321.CN03.Repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SupplierInitializationService {

    @Autowired
    private SupplierRepository supplierRepository;

    public void initializeSuppliers() {
        createSupplier("SupplierA", "1234 StreetA", "12345678");
        createSupplier("SupplierB", "5678 StreetB", "87654321");
        //If we need to add more suppliers, just add more createSupplier() calls here
    }

    private Supplier createSupplier(String name, String address, String contact) {
        Supplier supplier = new Supplier();
        supplier.setSupplierName(name);
        supplier.setSupplier_address(address);
        supplier.setSupplier_contact(contact);
        return supplierRepository.save(supplier);
    }
}
