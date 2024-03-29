package CSIT321.CN03.Model;

import CSIT321.CN03.Model.Order.Order;
import CSIT321.CN03.Model.Stock.Stock;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
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
@Table(name = "supplier")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Supplier_SEQ")
    @SequenceGenerator(name = "Supplier_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Stock> stocks = new LinkedHashSet<>();

    @OneToMany(mappedBy = "supplier", fetch = FetchType.LAZY)
    private Set<Order> orders = new LinkedHashSet<>();

    private String supplierName;
    private String supplier_address;
    private String supplier_contact;

}