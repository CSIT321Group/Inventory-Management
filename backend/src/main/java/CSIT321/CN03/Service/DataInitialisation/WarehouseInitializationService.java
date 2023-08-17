package CSIT321.CN03.Service.DataInitialisation;

import CSIT321.CN03.Model.Enums.Stockroom_Type;
import CSIT321.CN03.Model.StockRoom.*;
import CSIT321.CN03.Model.Warehouse;
import CSIT321.CN03.Repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class WarehouseInitializationService {

    @Autowired
    private WarehouseRepository warehouseRepository;
    @Autowired
    private StockRoomRepository stockRoomRepository;
    @Autowired
    private AisleRepository aisleRepository;
    @Autowired
    private RackRepository rackRepository;
    @Autowired
    private ShelfRepository shelfRepository;
    @Autowired
    private PositionRepository positionRepository;

    public void initializeWarehouses() {
        Warehouse warehouse = createWarehouse("Main Warehouse", "123 Fake Street");

        for (int roomNumber = 1; roomNumber <= 2; roomNumber++) {
            StockRoom stockRoom = createStockRoom("Stock Room " + roomNumber, warehouse);
            initializeAislesForStockRoom(stockRoom);
        }
    }

    private Warehouse createWarehouse(String name, String address) {
        Warehouse warehouse = new Warehouse();
        warehouse.setWarehouse_Name(name);
        warehouse.setWarehouse_Address(address);
        return warehouseRepository.save(warehouse);
    }

    private StockRoom createStockRoom(String name, Warehouse warehouse) {
        StockRoom stockRoom = new StockRoom();
        stockRoom.setName(name);
        stockRoom.setWarehouse(warehouse);
        stockRoom.setType(Stockroom_Type.GENERAL);
        return stockRoomRepository.save(stockRoom);
    }

    private void initializeAislesForStockRoom(StockRoom stockRoom) {
        for (int aisleNumber = 1; aisleNumber <= 3; aisleNumber++) {
            Aisle aisle = createAisle(aisleNumber, stockRoom);
            initializeRacksForAisle(aisle);
        }
    }

    private Aisle createAisle(int identifier, StockRoom stockRoom) {
        Aisle aisle = new Aisle();
        aisle.setAisleIdentifier(identifier);
        aisle.setStockRoom(stockRoom);
        return aisleRepository.save(aisle);
    }

    private void initializeRacksForAisle(Aisle aisle) {
        for (int rackNumber = 1; rackNumber <= 4; rackNumber++) {
            Rack rack = createRack(rackNumber, aisle);
            initializeShelvesForRack(rack);
        }
    }

    private Rack createRack(int identifier, Aisle aisle) {
        Rack rack = new Rack();
        rack.setRackIdentifier(identifier);
        rack.setAisle(aisle);
        return rackRepository.save(rack);
    }

    private void initializeShelvesForRack(Rack rack) {
        for (int shelfLevel = 1; shelfLevel <= 4; shelfLevel++) {
            Shelf shelf = createShelf(shelfLevel, rack);
            initializePositionsForShelf(shelf);
        }
    }

    private Shelf createShelf(int level, Rack rack) {
        Shelf shelf = new Shelf();
        shelf.setRack(rack);
        shelf.setLevel(level);
        return shelfRepository.save(shelf);
    }

    private void initializePositionsForShelf(Shelf shelf) {
        // Each shelf has a max of two positions
        for (int positionNumber = 1; positionNumber <= 2; positionNumber++) {
            createPosition(String.valueOf(positionNumber), shelf);
        }
    }

    private Position createPosition(String identifier, Shelf shelf) {
        Position position = new Position();
        position.setShelf(shelf);
        position.setPositionIdentifier(identifier);
        return positionRepository.save(position);
    }
}