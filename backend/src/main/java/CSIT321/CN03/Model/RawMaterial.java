package CSIT321.CN03.Model;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("raw_material")
public class RawMaterial extends Stock {

}