package CSIT321.CN03.Repository;

import CSIT321.CN03.Model.Stock.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
}