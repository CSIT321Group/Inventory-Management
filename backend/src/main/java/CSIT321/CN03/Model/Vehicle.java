package CSIT321.CN03.Model;

import CSIT321.CN03.Model.Enums.Vehicle_Type;
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
@Table(name = "vehicle")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Vehicle_SEQ")
    @SequenceGenerator(name = "Vehicle_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @Enumerated(EnumType.STRING)
    private Vehicle_Type type;

    private String vehicle_make;
    private String vehicle_model;
    private int vehicle_year;
}