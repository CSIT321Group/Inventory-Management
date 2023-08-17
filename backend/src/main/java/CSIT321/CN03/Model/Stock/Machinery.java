package CSIT321.CN03.Model.Stock;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("machinery")
public class Machinery extends Stock {

}
