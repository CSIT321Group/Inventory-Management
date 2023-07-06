package CSIT321.CN03.Repository;

import CSIT321.CN03.Model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {
}