package CSIT321.CN03.Service.DataInitialisation;

import CSIT321.CN03.Model.Stock.*;
import CSIT321.CN03.Model.StockRoom.Position;
import CSIT321.CN03.Model.StockRoom.StockRoom;
import CSIT321.CN03.Model.Supplier;
import CSIT321.CN03.Repository.PositionRepository;
import CSIT321.CN03.Repository.StockRepository;
import CSIT321.CN03.Repository.StockRoomRepository;
import CSIT321.CN03.Repository.SupplierRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@Transactional
public class StockInitializationService {

    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private SupplierRepository supplierRepository;
    @Autowired
    private StockRoomRepository stockRoomRepository;
    @Autowired
    private PositionRepository positionRepository;
    private Set<Long> occupiedPositions = new HashSet<>();
    private Queue<Position> availablePositionsQueue = new LinkedList<>();


    public void initializeStocks() {
        log.info("Initializing stocks...");
        Supplier supplierA = supplierRepository.findBySupplierName("SupplierA");
        StockRoom stockRoom1 = stockRoomRepository.findByName("Stock Room 1");
        StockRoom stockRoom2 = stockRoomRepository.findByName("Stock Room 2");
        List<Position> allPositionsStockRoom1 = positionRepository.findAllByShelf_Rack_Aisle_StockRoom(stockRoom1);
        List<Position> allPositionsStockRoom2 = positionRepository.findAllByShelf_Rack_Aisle_StockRoom(stockRoom2);
        log.info("Number of positions in Stock Room 1: {}", allPositionsStockRoom1.size());
        log.info("Number of positions in Stock Room 2: {}", allPositionsStockRoom2.size());
        loadOccupiedPositions();

        Set<Long> occupiedPositions = stockRepository.findAllOccupiedPositions();

        int itemsPerCategory = 48; // 192 total items divided by 4 categories

        for (Position pos : allPositionsStockRoom1) {
            if (!occupiedPositions.contains(pos.getId())) {
                availablePositionsQueue.add(pos);
                log.info("Total available positions in the queue after initialization: {}", availablePositionsQueue.size());

            }
        }
        for (Position pos : allPositionsStockRoom2) {
            if (!occupiedPositions.contains(pos.getId())) {
                availablePositionsQueue.add(pos);
                log.info("Total available positions in the queue after initialization: {}", availablePositionsQueue.size());

            }
        }

        for (int i = 0; i < itemsPerCategory; i++) {

            if(availablePositionsQueue.isEmpty()) {
                log.warn("No more available positions. Exiting loop.");
                break;
            }

            Position positionConsumable = findNextAvailablePosition(stockRoom1);
            if (positionConsumable == null) {
                log.info("Stock Room 1 is full for ProductA-Consumable{}. Moving to Stock Room 2.", i);
                positionConsumable = findNextAvailablePosition(stockRoom2);
            }
            log.info("Creating ProductA-Consumable{} in {}", i, positionConsumable.getShelf().getRack().getAisle().getStockRoom().getName());
            createConsumable("ProductA-Consumable" + i, 100, supplierA, (positionConsumable.getShelf().getRack().getAisle().getStockRoom() != null ? positionConsumable.getShelf().getRack().getAisle().getStockRoom() : stockRoom1), positionConsumable, 10.5);

            Position positionEquipment = findNextAvailablePosition(stockRoom1);
            if (positionEquipment == null) {
                log.info("Stock Room 1 is full for ProductB-Equipment{}. Moving to Stock Room 2.", i);
                positionEquipment = findNextAvailablePosition(stockRoom2);
            }
            log.info("Creating ProductB-Equipment{} in {}", i, positionEquipment.getShelf().getRack().getAisle().getStockRoom().getName());
            createEquipment("ProductB-Equipment" + i, 50, supplierA, (positionEquipment.getShelf().getRack().getAisle().getStockRoom() != null ? positionEquipment.getShelf().getRack().getAisle().getStockRoom() : stockRoom1), positionEquipment, 15.0);

            Position positionRawMaterial = findNextAvailablePosition(stockRoom1);
            if (positionRawMaterial == null) {
                log.info("Stock Room 1 is full for ProductC-RawMaterial{}. Moving to Stock Room 2.", i);
                positionRawMaterial = findNextAvailablePosition(stockRoom2);
            }
            log.info("Creating ProductC-RawMaterial{} in {}", i, positionRawMaterial.getShelf().getRack().getAisle().getStockRoom().getName());
            createRawMaterial("ProductC-RawMaterial" + i, 75, supplierA, (positionRawMaterial.getShelf().getRack().getAisle().getStockRoom() != null ? positionRawMaterial.getShelf().getRack().getAisle().getStockRoom() : stockRoom1), positionRawMaterial, 20.0);

            Position positionMachinery = findNextAvailablePosition(stockRoom1);
            if (positionMachinery == null) {
                log.info("Stock Room 1 is full for ProductD-Machinery{}. Moving to Stock Room 2.", i);
                positionMachinery = findNextAvailablePosition(stockRoom2);
            }
            log.info("Creating ProductD-Machinery{} in {}", i, positionMachinery.getShelf().getRack().getAisle().getStockRoom().getName());
            createMachinery("ProductD-Machinery" + i, 30, supplierA, (positionMachinery.getShelf().getRack().getAisle().getStockRoom() != null ? positionMachinery.getShelf().getRack().getAisle().getStockRoom() : stockRoom1), positionMachinery, 25.0);
        }
        //occupiedPositions.clear();
        System.out.println("Stocks Done");
    }

    private void loadOccupiedPositions() {
        List<Stock> allStocks = stockRepository.findAll();
        for (Stock stock : allStocks) {
            occupiedPositions.add(stock.getPosition().getId());
        }
        log.info("Loaded {} occupied positions.", occupiedPositions.size());
    }

    public Position findNextAvailablePosition(StockRoom stockRoom) {
        log.info("Searching for the next available position in {}", stockRoom.getName());
        Position nextAvailablePosition = availablePositionsQueue.poll();
        log.info("Polled position with ID: {} from availablePositionsQueue", nextAvailablePosition.getId());
        if (nextAvailablePosition == null) {
            return null; // Return null if no position is available.
        }

        if (!nextAvailablePosition.getShelf().getRack().getAisle().getStockRoom().equals(stockRoom)) {
            availablePositionsQueue.offer(nextAvailablePosition);  // Add back the position into the queue.
            return null;
        }
        return nextAvailablePosition;
    }

    public boolean isPositionOccupied(Position position) {
        boolean isOccupied = occupiedPositions.contains(position.getId());
        log.info("Position {} is occupied: {}", position.getId(), isOccupied);
        return isOccupied;
    }

    private Consumables createConsumable(String productName, int quantity, Supplier supplier, StockRoom stockRoom1, Position position, double unitPrice) {
        Consumables consumable = new Consumables();
        consumable.setStock_name(productName);
        consumable.setStock_quantity(quantity);
        consumable.setSupplier(supplier);
        consumable.setStockRoom(stockRoom1);
        consumable.setPosition(position);
        consumable.setUnit_price(unitPrice);
        markPositionAsOccupied(position);
        log.info("Saving consumable: {}", consumable.getStock_name());
        return stockRepository.save(consumable);
    }

    private Equipment createEquipment(String productName, int quantity, Supplier supplier, StockRoom stockRoom1, Position position, double unitPrice) {

        Equipment equipment = new Equipment();
        equipment.setStock_name(productName);
        equipment.setStock_quantity(quantity);
        equipment.setSupplier(supplier);
        equipment.setStockRoom(stockRoom1);
        equipment.setPosition(position);
        equipment.setUnit_price(unitPrice);
        markPositionAsOccupied(position);
        log.info("Saving equipment: {}", equipment.getStock_name());
        return stockRepository.save(equipment);
    }

    private RawMaterial createRawMaterial(String productName, int quantity, Supplier supplier, StockRoom stockRoom1, Position position, double unitPrice) {
        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setStock_name(productName);
        rawMaterial.setStock_quantity(quantity);
        rawMaterial.setSupplier(supplier);
        rawMaterial.setStockRoom(stockRoom1);
        rawMaterial.setPosition(position);
        rawMaterial.setUnit_price(unitPrice);
        markPositionAsOccupied(position);
        log.info("Saving raw material: {}", rawMaterial.getStock_name());
        return stockRepository.save(rawMaterial);
    }

    private Machinery createMachinery(String productName, int quantity, Supplier supplier, StockRoom stockRoom1, Position position, double unitPrice) {
        Machinery machinery = new Machinery();
        machinery.setStock_name(productName);
        machinery.setStock_quantity(quantity);
        machinery.setSupplier(supplier);
        machinery.setStockRoom(stockRoom1);
        machinery.setPosition(position);
        machinery.setUnit_price(unitPrice);
        markPositionAsOccupied(position);
        log.info("Saving machinery: {}", machinery.getStock_name());
        return stockRepository.save(machinery);
    }

    private void markPositionAsOccupied(Position position) {
        position.setIsOccupied(true);
        positionRepository.save(position); // Ensure the updated position is persisted
    }
}