package CSIT321.CN03.Model.Stock;

import CSIT321.CN03.Model.StockRoom.*;
import CSIT321.CN03.Model.Supplier;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import static CSIT321.CN03.Utils.WarehouseUtils.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "stock_type")
@Table(name = "stock")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "stockId")
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "stock_type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = RawMaterial.class, name = "raw_material"),
        @JsonSubTypes.Type(value = Machinery.class, name = "machinery"),
        @JsonSubTypes.Type(value = Equipment.class, name = "equipment"),
        @JsonSubTypes.Type(value = Consumables.class, name = "consumables")
})
public abstract class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Stock_SEQ")
    @SequenceGenerator(name = "Stock_SEQ")
    @Column(name = "id", nullable = false)
    private Long stockId;

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

    private String supplierName;

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

    public void setPosition(Position position) {
        this.position = position;
        if (position != null) {
            this.location = generateLocation(position);
        } else {
            this.location = null;
        }
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
        if (supplier != null) {
            this.supplierName = supplier.getSupplierName();
        }
    }


    public double distanceTo(Stock other) {
        int stockRoomDist = 0, aisleDist = 0, rackDist = 0, shelfDist = 0;

        if (!this.position.getShelf().getRack().getAisle().getStockRoom().getId().equals(
                other.position.getShelf().getRack().getAisle().getStockRoom().getId())) {
            stockRoomDist = STOCKROOM_WEIGHT;
        } else if (!this.position.getShelf().getRack().getAisle().getId().equals(
                other.position.getShelf().getRack().getAisle().getId())) {
            aisleDist = AISLE_WEIGHT;
        } else if (!this.position.getShelf().getRack().getId().equals(
                other.position.getShelf().getRack().getId())) {
            rackDist = RACK_WEIGHT;
        } else {
            shelfDist = SHELF_WEIGHT * Math.abs(this.position.getShelf().getLevel() - other.position.getShelf().getLevel());
        }

        return stockRoomDist + aisleDist + rackDist + shelfDist;
    }

    private String generateLocation(Position position) {
        Shelf shelf = position.getShelf();
        Rack rack = shelf.getRack();
        Aisle aisle = rack.getAisle();
        StockRoom stockRoom = aisle.getStockRoom();

        return String.format("SR%s|%s|%s|%s|%s",
                stockRoom.getId(),
                aisle.getAisleIdentifier(),
                rack.getRackIdentifier(),
                shelf.getLevel(),
                position.getPositionIdentifier());
    }

    public String getStockType() {
        DiscriminatorValue discriminatorValue = this.getClass().getAnnotation(DiscriminatorValue.class);
        if (discriminatorValue != null) {
            return discriminatorValue.value();
        }
        return null; // or throw an exception if this scenario is unexpected
    }
}