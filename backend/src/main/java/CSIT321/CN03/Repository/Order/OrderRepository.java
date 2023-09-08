package CSIT321.CN03.Repository.Order;

import CSIT321.CN03.Model.Order.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o WHERE o.supplier.id = :supplierId")
    List<Order> findAllBySupplierId(Long supplierId);

    @Query("SELECT o FROM Order o " +
            "JOIN FETCH o.orderItems oi " +
            "JOIN FETCH oi.stock s " +
            "JOIN FETCH s.position p " +
            "JOIN FETCH p.shelf sh " +
            "JOIN FETCH sh.rack r " +
            "JOIN FETCH r.aisle a " +
            "JOIN FETCH a.stockRoom sr ")
    List<Order> findOrdersWithOrderItemsAndPositions();

    @Query("SELECT o FROM Order o " +
            "JOIN FETCH o.orderItems oi " +
            "JOIN FETCH oi.stock s " +
            "JOIN FETCH s.position p " +
            "JOIN FETCH p.shelf sh " +
            "JOIN FETCH sh.rack r " +
            "JOIN FETCH r.aisle a " +
            "JOIN FETCH a.stockRoom sr " +
            "WHERE o.id = :orderId")
    Optional<Order> findOrderWithOrderItemsAndPositions(@Param("orderId") Long orderId);

    @Query("SELECT oi.stock.stockId, oi.stock.stock_name, oi.stock.stock_quantity, oi.stock.supplier.supplierName, COUNT(DISTINCT oi.order) as orderFrequency " +
            "FROM Order_Item oi " +
            "GROUP BY oi.stock.stockId, oi.stock.stock_name, oi.stock.stock_quantity, oi.stock.supplier.supplierName " +
            "ORDER BY orderFrequency DESC")
    List<Object[]> findTopSellingItemsByFrequency();


}