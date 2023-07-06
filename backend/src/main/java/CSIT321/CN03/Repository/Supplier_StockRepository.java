package CSIT321.CN03.Repository;

import CSIT321.CN03.Model.Supplier_Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Supplier_StockRepository extends JpaRepository<Supplier_Stock, Long> {
}