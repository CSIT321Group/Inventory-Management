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
@Table(name = "outside_storage")
public class OutsideStorage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "OutsideStorage_SEQ")
    @SequenceGenerator(name = "OutsideStorage_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

}