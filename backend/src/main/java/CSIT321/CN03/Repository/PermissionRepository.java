package CSIT321.CN03.Repository;

import CSIT321.CN03.Model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
}