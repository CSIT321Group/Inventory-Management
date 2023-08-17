package CSIT321.CN03.Repository;

import CSIT321.CN03.Model.Order.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}