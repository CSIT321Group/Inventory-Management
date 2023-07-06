package CSIT321.CN03.Repository;

import CSIT321.CN03.Model.OutsideStorage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OutsideStorageRepository extends JpaRepository<OutsideStorage, Long> {
}