package CSIT321.CN03.Model.Stock;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("consumables")
public class Consumables extends Stock {

}
