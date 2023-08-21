package CSIT321.CN03.Repository.Employee;

import CSIT321.CN03.Model.Employee.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String roleName);
}