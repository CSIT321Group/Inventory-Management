package CSIT321.CN03.Model;

import CSIT321.CN03.Model.Employee.StaffMember;
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
@Table(name = "warehouse_staff")
public class Warehouse_Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Warehouse_Staff_SEQ")
    @SequenceGenerator(name = "Warehouse_Staff_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "staff_member_id")
    private StaffMember staffMember;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

}