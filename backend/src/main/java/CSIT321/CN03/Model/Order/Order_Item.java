package CSIT321.CN03.Model.Order;

import CSIT321.CN03.Model.Stock.Stock;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@Table(name = "order_item", indexes = {
        @Index(name = "idx_order_item_stock", columnList = "stock_id"),
        @Index(name = "idx_order_item_order", columnList = "order_id")
})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Order_Item {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "OrderItem_SEQ")
    @SequenceGenerator(name = "OrderItem_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    private int quantity;
    private double unitPrice;
}
