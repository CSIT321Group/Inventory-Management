package CSIT321.CN03.Repository.StockRoom;

import CSIT321.CN03.Model.StockRoom.Aisle;
import CSIT321.CN03.Model.StockRoom.StockRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AisleRepository extends JpaRepository<Aisle, Long> {
    List<Aisle> findByStockRoomOrderByAisleIdentifier(StockRoom stockRoom);
}