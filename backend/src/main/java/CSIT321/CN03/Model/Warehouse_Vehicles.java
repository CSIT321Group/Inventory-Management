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
@Table(name = "warehouse_vehicles")
public class Warehouse_Vehicles {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Warehouse_Vehicles_SEQ")
    @SequenceGenerator(name = "Warehouse_Vehicles_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

}