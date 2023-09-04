package CSIT321.CN03.Service;

import CSIT321.CN03.Model.Supplier;
import CSIT321.CN03.Repository.SupplierRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    public Supplier getSupplierById(Long id) {
        return supplierRepository.findDetailedSupplierById(id).orElseThrow(() -> new EntityNotFoundException("Supplier not found with id: " + id));
    }

    public Supplier getSupplierByName(String name) {
        return supplierRepository.findBySupplierName(name);
    }

    public Supplier saveSupplier(Supplier supplier) {
        return ResponseEntity.ok().body(supplierRepository.save(supplier)).getBody();
    }

    public void deleteSupplier(Long id) {
        supplierRepository.deleteById(id);
    }

    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

}
