package CSIT321.CN03.Repository;

import CSIT321.CN03.Model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock, Long> {

    @Query(value = "SELECT * FROM stock WHERE " +
            "LOWER(stock_name) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
            "CAST(id AS TEXT) LIKE CONCAT('%', :searchText, '%') OR " +
            "LOWER(stock_type) LIKE LOWER(CONCAT('%', :searchText, '%'))", nativeQuery = true)
    List<Stock> search(@Param("searchText") String searchText);
}