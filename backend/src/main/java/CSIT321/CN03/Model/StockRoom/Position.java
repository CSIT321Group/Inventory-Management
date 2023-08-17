package CSIT321.CN03.Model.StockRoom;

import CSIT321.CN03.Model.Stock.Stock;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "position")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Position_SEQ")
    @SequenceGenerator(name = "Position_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "shelf_id")
    @JsonIdentityReference(alwaysAsId = true)
    private Shelf shelf;

    @OneToOne(mappedBy = "position")
    @JsonIdentityReference(alwaysAsId = true)
    private Stock stock;

    private String positionIdentifier; // P1, P2, etc.


    @Column(name = "is_occupied", nullable = false)
    private boolean isOccupied = false;

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

    @Override
    public String toString() {
        return super.toString() + "Position{" +
                "id=" + id +
                ", stock=" + stock +
                ", positionIdentifier='" + positionIdentifier + '\'' +
                ", isOccupied=" + isOccupied +
                '}';
    }

    public void setIsOccupied(boolean b) {
        this.isOccupied = b;
    }
}
