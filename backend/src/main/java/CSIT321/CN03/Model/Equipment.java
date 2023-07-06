package CSIT321.CN03.Model;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("equipment")
public class Equipment extends Stock {

}