package CSIT321.CN03.Model;

import CSIT321.CN03.Model.Enums.Stockroom_Type;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "stock_room")
public class StockRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "StockRoom_SEQ")
    @SequenceGenerator(name = "StockRoom_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @OneToMany(mappedBy = "stockRoom")
    private Set<Stock> stocks = new LinkedHashSet<>();

    @Enumerated(EnumType.STRING)
    private Stockroom_Type type;

}