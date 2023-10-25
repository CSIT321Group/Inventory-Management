package CSIT321.CN03.Repository.Stock;

import CSIT321.CN03.Model.Stock.Machinery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MachineryRepository extends JpaRepository<Machinery, Long> {
}