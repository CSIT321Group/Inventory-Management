package CSIT321.CN03.Model.StockRoom;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
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
@Table(name = "aisle")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Aisle {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Aisle_SEQ")
    @SequenceGenerator(name = "Aisle_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "stock_room_id")
    @JsonIdentityReference(alwaysAsId = true)
    private StockRoom stockRoom;

    @OneToMany(mappedBy = "aisle", fetch = FetchType.EAGER)
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Rack> racks = new LinkedHashSet<>();

    private String aisleIdentifier; // e.g., A1, A2, etc.

    public void setAisleIdentifier(int id) {
        this.aisleIdentifier = "A"+id;
    }

    @Override
    public String toString() {
        return super.toString() + "Aisle{" +
                "id=" + id +
                ", aisleIdentifier='" + aisleIdentifier + '\'' +
                '}';
    }
}