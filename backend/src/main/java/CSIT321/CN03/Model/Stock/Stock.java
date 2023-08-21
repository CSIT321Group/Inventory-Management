package CSIT321.CN03.Model.Stock;

import CSIT321.CN03.Model.StockRoom.*;
import CSIT321.CN03.Model.Supplier;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "stock_type")
@Table(name = "stock")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public abstract class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Stock_SEQ")
    @SequenceGenerator(name = "Stock_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "stock_room_id")
    @JsonIdentityReference(alwaysAsId = true)
    private StockRoom stockRoom;

    @OneToOne
    @JoinColumn(name = "position_id")
    private Position position;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    @JsonIdentityReference(alwaysAsId = true)
    private Supplier supplier;

    private String stock_name;
    private int stock_quantity;
    private double unit_price;
    @Column(insertable = false, updatable = false)
    private String stock_type;

    private String location;

    public Stock() {
        DiscriminatorValue discriminatorValue = this.getClass().getAnnotation(DiscriminatorValue.class);
        if (discriminatorValue != null) {
            this.stock_type = discriminatorValue.value();
        }
    }

    public double distanceTo(Stock other) {
        double x1 = this.stockRoom.getId();
        double y1 = this.position.getId();
        double z1 = this.position.getShelf().getId();

        double x2 = other.stockRoom.getId();
        double y2 = other.position.getId();
        double z2 = other.position.getShelf().getId();

        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
    }

    public String getLocation() {
        if (position == null) {
            return "Position not set for this stock";
        }

        Shelf shelf = position.getShelf();
        if (shelf == null) {
            return "Shelf not set for this stock's position";
        }

        Rack rack = shelf.getRack();
        if (rack == null) {
            return "Rack not set for this stock's shelf";
        }

        Aisle aisle = rack.getAisle();
        if (aisle == null) {
            return "Aisle not set for this stock's rack";
        }

        StockRoom stockRoom = aisle.getStockRoom();
        if (stockRoom == null) {
            return "StockRoom not set for this stock's aisle";
        }

        return String.format("SR%d|%s|%s|%s|%s", stockRoom.getId(), aisle.getAisleIdentifier(), rack.getRackIdentifier(),position.getShelf().getLevel(), position.getPositionIdentifier());
    }
}
