package CSIT321.CN03.Model.Stock;

import CSIT321.CN03.Model.Stock.Stock;
import jakarta.persistence.*;

@Entity
@DiscriminatorValue("raw_material")
public class RawMaterial extends Stock {

}