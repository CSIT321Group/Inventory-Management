package CSIT321.CN03.Repository;

import CSIT321.CN03.Model.StockRoom.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {
    List<Position> findByShelf(Shelf shelf);

    List<Position> findAllByShelf_Rack_Aisle_StockRoom(StockRoom stockRoom);

    @Query("SELECT p FROM Position p JOIN p.shelf s JOIN s.rack r JOIN r.aisle a JOIN a.stockRoom sr WHERE sr.id = :stockRoomId AND p.stock IS NULL")
    List<Position> findAvailablePositionsInStockRoom(@Param("stockRoomId") Long stockRoomId);

    @Query("SELECT pos FROM Position pos " +
            "JOIN pos.shelf sh " +
            "JOIN sh.rack ra " +
            "JOIN ra.aisle ai " +
            "JOIN ai.stockRoom st " +
            "JOIN pos.stock stck " +
            "WHERE st.id = :stockRoomId AND stck.stock_type = :type " +
            "ORDER BY ai.aisleIdentifier DESC, ra.rackIdentifier DESC, sh.level DESC, pos.id DESC")
    List<Position> findLastPositionOfSameType(@Param("stockRoomId") Long stockRoomId, @Param("type") String type);

    @Query("SELECT p FROM Position p WHERE p.shelf.rack.aisle = :aisle AND p.shelf.rack = :rack AND p.shelf = :shelf AND p.positionIdentifier = :positionIdentifier")
    Position findByAisleAndRackAndShelfAndPositionIdentifier(Aisle aisle, Rack rack, Shelf shelf, String positionIdentifier);

    List<Position> findAllByIsOccupiedFalse();
}