package CSIT321.CN03.Repository;

import CSIT321.CN03.Model.Consumables;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsumablesRepository extends JpaRepository<Consumables, Long> {
}