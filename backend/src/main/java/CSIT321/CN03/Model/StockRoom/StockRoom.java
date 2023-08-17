package CSIT321.CN03.Model.StockRoom;

import CSIT321.CN03.Model.Enums.Stockroom_Type;
import CSIT321.CN03.Model.Stock.Stock;
import CSIT321.CN03.Model.Warehouse;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class StockRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "StockRoom_SEQ")
    @SequenceGenerator(name = "StockRoom_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @JsonIgnore
    @OneToMany(mappedBy = "stockRoom", fetch = FetchType.EAGER)
    private Set<Stock> stocks = new LinkedHashSet<>();

    @OneToMany(mappedBy = "stockRoom", fetch = FetchType.EAGER)
    private Set<Aisle> aisles = new LinkedHashSet<>();

    @Enumerated(EnumType.STRING)
    private Stockroom_Type type;

    @Override
    public String toString() {
        return "StockRoom{" +
                "id=" + id +
                '}';
    }
}