package CSIT321.CN03.Repository.StockRoom;

import CSIT321.CN03.Model.StockRoom.Rack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RackRepository extends JpaRepository<Rack, Long> {
}