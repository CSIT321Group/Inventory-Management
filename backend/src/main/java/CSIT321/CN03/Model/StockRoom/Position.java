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

import static CSIT321.CN03.Utils.WarehouseUtils.*;

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
    //@JsonIdentityReference(alwaysAsId = true)
    private Shelf shelf;

    @OneToOne(mappedBy = "position")
    @JsonIdentityReference(alwaysAsId = true)
    private Stock stock;

    private String positionIdentifier; // P1, P2, etc.


    @Column(name = "is_occupied", nullable = false)
    private boolean isOccupied = false;


    public int getWeight() {
        int weight = 0;

        if (this.getShelf() != null) {
            weight += SHELF_WEIGHT;
            if (this.getShelf().getRack() != null) {
                weight += RACK_WEIGHT;
                if (this.getShelf().getRack().getAisle() != null) {
                    weight += AISLE_WEIGHT;
                    if (this.getShelf().getRack().getAisle().getStockRoom() != null) {
                        weight += STOCKROOM_WEIGHT;
                    }
                }
            }
        }
        return weight;
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
