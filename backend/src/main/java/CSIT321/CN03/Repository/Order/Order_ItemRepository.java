package CSIT321.CN03.Repository.Order;

import CSIT321.CN03.Model.Order.Order_Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface Order_ItemRepository extends JpaRepository<Order_Item, Long> {
}