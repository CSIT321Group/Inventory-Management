package CSIT321.CN03.Repository.Order;

import CSIT321.CN03.Model.Order.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o WHERE o.supplier.id = :supplierId")
    List<Order> findAllBySupplierId(Long supplierId);
}