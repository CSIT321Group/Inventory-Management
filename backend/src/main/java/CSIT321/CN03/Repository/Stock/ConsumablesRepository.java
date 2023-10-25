package CSIT321.CN03.Repository.Stock;

import CSIT321.CN03.Model.Stock.Consumables;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsumablesRepository extends JpaRepository<Consumables, Long> {
}