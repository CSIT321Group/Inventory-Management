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
@Table(name = "supplier")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Supplier_SEQ")
    @SequenceGenerator(name = "Supplier_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private Set<Stock> stocks = new LinkedHashSet<>();

    private String supplier_name;
    private String supplier_address;
    private String supplier_contact;

}