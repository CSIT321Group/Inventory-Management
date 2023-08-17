package CSIT321.CN03.Model.StockRoom;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
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
@Table(name = "rack")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Rack {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Rack_SEQ")
    @SequenceGenerator(name = "Rack_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "aisle_id")
    @JsonIdentityReference(alwaysAsId = true)
    private Aisle aisle;

    @OneToMany(mappedBy = "rack", fetch = FetchType.EAGER)
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Shelf> shelves = new LinkedHashSet<>();

    private String rackIdentifier; // e.g., R1, R2, etc.

    public void setRackIdentifier(int id) {
        this.rackIdentifier = "R"+id;
    }

    @Override
    public String toString() {
        return super.toString() + "Rack{" +
                "id=" + id +
                '}';
    }
}