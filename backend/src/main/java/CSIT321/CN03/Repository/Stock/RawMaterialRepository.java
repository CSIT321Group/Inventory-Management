package CSIT321.CN03.Repository.Stock;

import CSIT321.CN03.Model.Stock.RawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RawMaterialRepository extends JpaRepository<RawMaterial, Long> {
}