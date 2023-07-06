package CSIT321.CN03.Repository;

import CSIT321.CN03.Model.StaffMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffMemberRepository extends JpaRepository<StaffMember, Long> {
}