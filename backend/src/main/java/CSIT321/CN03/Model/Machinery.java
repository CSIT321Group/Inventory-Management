package CSIT321.CN03.Model;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("machinery")
public class Machinery extends Stock {

}
