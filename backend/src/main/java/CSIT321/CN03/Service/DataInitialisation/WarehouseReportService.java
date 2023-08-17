package CSIT321.CN03.Service.DataInitialisation;

import CSIT321.CN03.Model.Stock.Stock;
import CSIT321.CN03.Model.StockRoom.Position;
import CSIT321.CN03.Repository.PositionRepository;
import CSIT321.CN03.Repository.StockRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
public class WarehouseReportService {

    @Autowired
    private PositionRepository positionRepository;


    /**
     * This method provides a report on the stock type counts.
     */
    public Map<String, Integer> getStockTypeCounts(Map<String, Integer> stockTypeCounts) {
        return stockTypeCounts;
    }

    /**
     * This method provides a report on the distribution of stock types across stock rooms.
     */
    public Map<String, Map<String, Integer>> getStockRoomDistribution(Map<String, Map<String, Integer>> stockRoomDistribution) {
        return stockRoomDistribution;
    }

    /**
     * This method provides a report on the last position each stock type was placed.
     */
    public Map<String, Position> getLastPositionsPerType(Map<String, Position> lastPositionsPerType) {
        return lastPositionsPerType;
    }

    /**
     * This method provides a report on any unoccupied positions in the warehouse.
     */
    public List<Position> getEmptyPositions() {
        return positionRepository.findAllByIsOccupiedFalse();
    }

    /**
     * This method provides a report on stock density, i.e., the total count of items in each section.
     */
    public Map<String, Integer> getStockDensityReport(Map<String, Map<String, Integer>> stockRoomDistribution) {
        Map<String, Integer> stockDensity = new HashMap<>();
        for (Map.Entry<String, Map<String, Integer>> entry : stockRoomDistribution.entrySet()) {
            stockDensity.put(entry.getKey(), entry.getValue().values().stream().mapToInt(Integer::intValue).sum());
        }
        return stockDensity;
    }

    public void printMap(Map<?, ?> map) {
        for (Map.Entry<?, ?> entry : map.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }

    public void printList(List<?> list) {
        for (Object item : list) {
            System.out.println(item);
        }
    }

    public void printStockDetails(List<Stock> allStocks) {
        for (Stock stock : allStocks) {
            System.out.println("ID: " + stock.getId());
            System.out.println("Stock Room: " + stock.getStockRoom());
            System.out.println("Position ID: " + stock.getPosition().getId());
            System.out.println("Shelf: " + stock.getPosition().getShelf());
            System.out.println("Stock Name: " + stock.getStock_name());
            System.out.println("Stock Quantity: " + stock.getStock_quantity());
            System.out.println("Unit Price: " + stock.getUnit_price());
            System.out.println("Stock Type: " + stock.getStock_type());
            System.out.println("---------");
        }
    }

    public void printStockDistances(List<Stock> allStocks) {

        Map<String, List<Stock>> stockTypeGroups = allStocks.stream()
                .collect(Collectors.groupingBy(Stock::getStock_type));

        stockTypeGroups.forEach((type, stocksOfType) -> {
            List<Double> distances = new ArrayList<>();

            for (int i = 0; i < stocksOfType.size(); i++) {
                for (int j = i + 1; j < stocksOfType.size(); j++) {
                    distances.add(stocksOfType.get(i).distanceTo(stocksOfType.get(j)));
                }
            }

            double averageDistance = distances.stream().mapToDouble(Double::doubleValue).average().orElse(0);

            System.out.println("Average distance between stocks of type " + type + " = " + averageDistance);
        });
    }

}
