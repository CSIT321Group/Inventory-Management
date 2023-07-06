package CSIT321.CN03.Repository;

import CSIT321.CN03.Model.StockRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRoomRepository extends JpaRepository<StockRoom, Long> {
}