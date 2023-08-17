package CSIT321.CN03.Repository;

import CSIT321.CN03.Model.StockRoom.StockRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StockRoomRepository extends JpaRepository<StockRoom, Long> {
    StockRoom findByName(String s);

    @Query("SELECT s FROM StockRoom s JOIN FETCH s.aisles a JOIN FETCH a.racks r JOIN FETCH r.shelves sh JOIN FETCH sh.positions WHERE s.name = :name")
    StockRoom findByNameWithEagerFetch(@Param("name") String name);
}