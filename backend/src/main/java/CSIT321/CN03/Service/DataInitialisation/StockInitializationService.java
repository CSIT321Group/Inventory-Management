package CSIT321.CN03.Service.DataInitialisation;

import CSIT321.CN03.Model.Stock.*;
import CSIT321.CN03.Model.StockRoom.Position;
import CSIT321.CN03.Model.StockRoom.StockRoom;
import CSIT321.CN03.Model.Supplier;
import CSIT321.CN03.Repository.StockRoom.PositionRepository;
import CSIT321.CN03.Repository.Stock.StockRepository;
import CSIT321.CN03.Repository.StockRoom.StockRoomRepository;
import CSIT321.CN03.Repository.SupplierRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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
    @Autowired
    private WarehouseReportService warehouseReportService;
    private Set<Long> occupiedPositions = new HashSet<>();
    private Queue<Position> availablePositionsQueue = new LinkedList<>();
    private List<Stock> temporaryStorage = new ArrayList<>();
    private Map<String, Position> lastPlacedPositionOfType = new HashMap<>();



    public void initializeStocks() {
        log.info("Initializing stocks...");

        Supplier supplierA = supplierRepository.findBySupplierName("SupplierA");
        StockRoom stockRoom1 = stockRoomRepository.findByName("Stock Room 1");
        StockRoom stockRoom2 = stockRoomRepository.findByName("Stock Room 2");

        int itemsPerCategory = 48; // 192 total items divided by 4 categories

        for (int i = 0; i < itemsPerCategory; i++) {
            // Create items but do not assign positions at this point.
            createConsumable("ProductA-Consumable" + i, 100, supplierA, null, null, 10.5);
            createEquipment("ProductB-Equipment" + i, 50, supplierA, null, null, 15.0);
            createRawMaterial("ProductC-RawMaterial" + i, 75, supplierA, null, null, 20.0);
            createMachinery("ProductD-Machinery" + i, 30, supplierA, null, null, 25.0);
        }

        // Call the optimizeStockPlacement method to handle the stock placement
        optimizeStockPlacement();

        reassignDisplacedStocks();

        log.info("Stocks Done");
        List<Stock> allStocks = stockRepository.findAll();
        warehouseReportService.printAverageStockDistances(allStocks);
    }


    private void loadOccupiedPositions() {
        List<Stock> allStocks = stockRepository.findAll();
        for (Stock stock : allStocks) {
            occupiedPositions.add(stock.getPosition().getId());
        }
        log.info("Loaded {} occupied positions.", occupiedPositions.size());
    }

    public void optimizeStockPlacement() {
        List<Stock> stocks = stockRepository.findAllOrderByStockType();

        Map<String, List<Stock>> groupedStocks = stocks.stream()
                .collect(Collectors.groupingBy(Stock::getStockType));

        for (Map.Entry<String, List<Stock>> entry : groupedStocks.entrySet()) {
            List<Stock> stockTypeGroup = entry.getValue();
            for (Stock stock : stockTypeGroup) {
                Position position = positionRepository.findFirstByIsOccupiedFalse();
                if (position != null) {
                    position.setIsOccupied(true);
                    stock.setPosition(position);
                    stock.setStockRoom(position.getShelf().getRack().getAisle().getStockRoom());
                    // Save updated entities
                    positionRepository.save(position);
                    stockRepository.save(stock);
                }
            }
        }
    }

    public Position findNextAvailablePosition(StockRoom stockRoom, String stockType) {
        log.info("Searching for the next available position in {} for stock type {}", stockRoom.getName(), stockType);

        Position startPosition = lastPlacedPositionOfType.getOrDefault(stockType, null);
        if (startPosition == null) {
            startPosition = availablePositionsQueue.peek();
        }

        Position nextAvailablePosition = getNextPositionFrom(startPosition);

        log.info("Selected position with ID: {} for stock type {}",
                (nextAvailablePosition != null ? nextAvailablePosition.getId() : "null"), stockType);

        // Check if position is occupied and move stock to temporary storage if it is
        if (isPositionOccupied(nextAvailablePosition)) {
            Stock displacedStock = stockRepository.findByPosition(nextAvailablePosition);
            temporaryStorage.add(displacedStock);
            // Nullify the position of the displaced stock in the database
            displacedStock.setPosition(null);
            stockRepository.save(displacedStock);
        }

        // If the polled position's stock room doesn't match the desired one, return it to the queue
        if (!nextAvailablePosition.getShelf().getRack().getAisle().getStockRoom().equals(stockRoom)) {
            availablePositionsQueue.offer(nextAvailablePosition);  // Add back the position into the queue.
            return null;
        }
        lastPlacedPositionOfType.put(stockType, nextAvailablePosition);
        return nextAvailablePosition;
    }

    private Position getNextPositionFrom(Position startPosition) {
        if (startPosition == null || !availablePositionsQueue.contains(startPosition)) {
            // If startPosition is null or not in the availablePositionsQueue,
            // then start from the beginning of the queue.
            return availablePositionsQueue.poll();
        }

        // Convert queue to a list to iterate starting from a specific position
        List<Position> positionList = new ArrayList<>(availablePositionsQueue);

        int startIndex = positionList.indexOf(startPosition);

        // Start searching from the startIndex
        for (int i = startIndex; i < positionList.size(); i++) {
            Position currentPosition = positionList.get(i);
            if (!isPositionOccupied(currentPosition)) {
                availablePositionsQueue.remove(currentPosition);  // Remove from the queue as it's being used
                return currentPosition;
            }
        }

        // If we haven't returned by this point, it means there's no available position
        // after the given startPosition in the list. We'll need to loop from the start of the list.
        for (int i = 0; i < startIndex; i++) {
            Position currentPosition = positionList.get(i);
            if (!isPositionOccupied(currentPosition)) {
                availablePositionsQueue.remove(currentPosition);  // Remove from the queue as it's being used
                return currentPosition;
            }
        }

        return null;  // Return null if no position is available.
    }


    public boolean isPositionOccupied(Position position) {
        boolean isOccupied = occupiedPositions.contains(position.getId());
        log.info("Position {} is occupied: {}", position.getId(), isOccupied);
        return isOccupied;
    }

    public void reassignDisplacedStocks() {
        for (Stock displacedStock : temporaryStorage) {
            Position newPosition = findNextAvailablePosition(displacedStock.getStockRoom(), displacedStock.getStock_type());
            if (newPosition != null) {
                displacedStock.setPosition(newPosition);
                stockRepository.save(displacedStock);
            } else {
                // Handle cases where no new position is found. E.g., log a warning.
            }
        }
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
        if(position != null) {
            position.setIsOccupied(true);
        }
    }

}