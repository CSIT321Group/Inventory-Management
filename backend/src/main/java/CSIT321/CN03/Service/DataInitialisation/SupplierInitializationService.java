package CSIT321.CN03.Service.DataInitialisation;

import CSIT321.CN03.Model.Supplier;
import CSIT321.CN03.Repository.SupplierRepository;
import CSIT321.CN03.Utils.StockSimulationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class SupplierInitializationService {

    @Autowired
    private SupplierRepository supplierRepository;

    public void initializeSuppliers() {
        createSupplier("SupplierA", "1234 StreetA", "12345678");
        createSupplier("SupplierB", "5678 StreetB", "87654321");
        //If we need to add more suppliers, just add more createSupplier() calls here

        Random random = new Random();
        for (int i = 0; i < 9; i++) {
            String firstName = StockSimulationUtils.SUPPLIER_FIRST_NAME.get(random.nextInt(StockSimulationUtils.SUPPLIER_FIRST_NAME.size()));
            String lastName = StockSimulationUtils.SUPPLIER_SECOND_NAME.get(random.nextInt(StockSimulationUtils.SUPPLIER_SECOND_NAME.size()));
            String name= (firstName + " " +lastName); //max 7 characters
            String address = "587 Royal Lane"; // You can randomize this if needed
            String contact = "0444668009";
            createSupplier(name,address,contact);
        }
    }

    private Supplier createSupplier(String name, String address, String contact) {
        Supplier supplier = new Supplier();
        supplier.setSupplierName(name);
        supplier.setSupplier_address(address);
        supplier.setSupplier_contact(contact);
        return supplierRepository.save(supplier);
    }
}
