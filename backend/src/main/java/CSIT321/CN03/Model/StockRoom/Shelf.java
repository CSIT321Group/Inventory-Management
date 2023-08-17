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
@Table(name = "shelf")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Shelf {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Shelf_SEQ")
    @SequenceGenerator(name = "Shelf_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "rack_id")
    @JsonIdentityReference(alwaysAsId = true)
    private Rack rack;

    @OneToMany(mappedBy = "shelf", fetch = FetchType.EAGER)
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Position> positions = new LinkedHashSet<>();

    private int level; // 1 (bottom shelf), 2, 3,

    @Override
    public String toString() {
        return super.toString() + "Shelf{" +
                "id=" + id +
                ", level=" + level +
                '}';
    }
}