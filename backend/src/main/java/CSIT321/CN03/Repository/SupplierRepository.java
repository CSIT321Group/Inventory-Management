package CSIT321.CN03.Repository;

import CSIT321.CN03.Model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    Supplier findBySupplierName(String supplierName);

    @Query("SELECT DISTINCT s FROM Supplier s " +
            "JOIN FETCH s.stocks")
    List<Supplier> findAllWithStocks();

    @Query("SELECT DISTINCT s FROM Supplier s " +
            "LEFT JOIN FETCH s.stocks stock " +
            "LEFT JOIN FETCH stock.position p " +
            "LEFT JOIN FETCH p.shelf sh " +
            "LEFT JOIN FETCH sh.rack r " +
            "LEFT JOIN FETCH r.aisle a " +
            "LEFT JOIN FETCH a.stockRoom sr")
    List<Supplier> findAllWithStocksAndLocation();

    @Query("SELECT DISTINCT s FROM Supplier s " +
            "JOIN FETCH s.stocks stock " +
            "JOIN FETCH stock.position p " +
            "JOIN FETCH p.shelf sh " +
            "JOIN FETCH sh.rack r " +
            "JOIN FETCH r.aisle a " +
            "JOIN FETCH a.stockRoom sr " +
            "WHERE s.id = :supplierId")
    Optional<Supplier> findDetailedSupplierById(@Param("supplierId") Long supplierId);


}