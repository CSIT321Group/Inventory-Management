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
@Table(name = "supplier_stock")
public class Supplier_Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Supplier_Stock_SEQ")
    @SequenceGenerator(name = "Supplier_Stock_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name="supplier_id", nullable=false)
    private Supplier supplier;

    @ManyToOne
    @JoinColumn(name="stock_id", nullable=false)
    private Stock stock;

}