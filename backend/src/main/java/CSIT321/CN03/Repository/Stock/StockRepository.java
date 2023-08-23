package CSIT321.CN03.Repository.Stock;

import CSIT321.CN03.Model.Stock.Stock;
import CSIT321.CN03.Model.StockRoom.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface StockRepository extends JpaRepository<Stock, Long> {

    @Query(value = "SELECT * FROM stock WHERE " +
            "LOWER(stock_name) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
            "CAST(id AS TEXT) LIKE CONCAT('%', :searchText, '%') OR " +
            "LOWER(stock_type) LIKE LOWER(CONCAT('%', :searchText, '%'))", nativeQuery = true)
    List<Stock> search(@Param("searchText") String searchText);

    Stock findByPosition(Position position);

    @Query("SELECT s FROM Stock s ORDER BY TYPE(s)")
    List<Stock> findAllOrderByStockType();

    @Query("SELECT s.position.id FROM Stock s")
    Set<Long> findAllOccupiedPositions();
}