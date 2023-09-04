package CSIT321.CN03.Service.DataInitialisation;

import CSIT321.CN03.Model.Stock.Stock;
import CSIT321.CN03.Model.StockRoom.Position;
import CSIT321.CN03.Repository.StockRoom.PositionRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void printStockDistances(List<Stock> allStocks) {
        Map<String, Long> stockTypeCounts = allStocks.stream()
                .collect(Collectors.groupingBy(s -> s.getStock_type(), Collectors.counting()));

        for (String type : stockTypeCounts.keySet()) { // For every stock type
            List<Stock> stocksOfType = allStocks.stream().filter(s -> s.getStock_type().equals(type)).collect(Collectors.toList());
            for (int i = 0; i < stocksOfType.size(); i++) {
                for (int j = i + 1; j < stocksOfType.size(); j++) {
                    Stock stock1 = stocksOfType.get(i);
                    Stock stock2 = stocksOfType.get(j);
                    double distance = stock1.distanceTo(stock2);
                    System.out.println("Distance between " + stock1.getStock_name() + " and " + stock2.getStock_name() + " = " + distance);
                }
            }
        }
    }

    public void printAverageStockDistances(List<Stock> allStocks) {
        Map<String, Long> stockTypeCounts = allStocks.stream()
                .collect(Collectors.groupingBy(s -> s.getStock_type(), Collectors.counting()));

        for (String type : stockTypeCounts.keySet()) { // For every stock type
            List<Stock> stocksOfType = allStocks.stream().filter(s -> s.getStock_type().equals(type)).collect(Collectors.toList());
            double totalDistance = 0.0;
            int pairCount = 0;
            for (int i = 0; i < stocksOfType.size(); i++) {
                for (int j = i + 1; j < stocksOfType.size(); j++) {
                    Stock stock1 = stocksOfType.get(i);
                    Stock stock2 = stocksOfType.get(j);
                    totalDistance += stock1.distanceTo(stock2);
                    pairCount++;
                }
            }
            double averageDistance = totalDistance / pairCount;
            System.out.println("Average distance for stock type " + type + " = " + averageDistance);
        }
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


}
