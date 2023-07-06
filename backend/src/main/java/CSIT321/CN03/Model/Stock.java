package CSIT321.CN03.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "stock_type")
@Table(name = "stock")
public abstract class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Stock_SEQ")
    @SequenceGenerator(name = "Stock_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "stock_room_id")
    private StockRoom stockRoom;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    private String stock_name;
    private int stock_quantity;
    private double unit_price;
}