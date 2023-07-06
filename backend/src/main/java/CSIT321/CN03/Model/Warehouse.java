package CSIT321.CN03.Model;

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
@Table(name = "warehouse")
public class Warehouse {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Warehouse_SEQ")
    @SequenceGenerator(name = "Warehouse_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;
    private String warehouse_Name;
    private String warehouse_Address;
    private String warehouse_contact;

    @OneToMany(mappedBy = "warehouse")
    private Set<StockRoom> stockRooms = new LinkedHashSet<>();

    @OneToMany(mappedBy = "warehouse")
    private Set<OutsideStorage> outsideStorages = new LinkedHashSet<>();

    @OneToMany(mappedBy = "warehouse")
    private Set<StaffMember> staffMembers = new LinkedHashSet<>();

    @OneToMany(mappedBy = "warehouse")
    private Set<Vehicle> vehicles = new LinkedHashSet<>();

}