package CSIT321.CN03.Repository;

import CSIT321.CN03.Model.StockRoom.Shelf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ShelfRepository extends JpaRepository<Shelf, Long> {

    @Query("SELECT sh FROM Shelf sh JOIN FETCH sh.positions WHERE sh.id = :shelfId")
    Shelf findByIdWithEagerFetchPositions(@Param("shelfId") Long shelfId);
}
