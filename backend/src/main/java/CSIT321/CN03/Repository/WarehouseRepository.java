package CSIT321.CN03.Repository;

import CSIT321.CN03.Model.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
}