package CSIT321.CN03.Repository.Employee;

import CSIT321.CN03.Model.Employee.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
}