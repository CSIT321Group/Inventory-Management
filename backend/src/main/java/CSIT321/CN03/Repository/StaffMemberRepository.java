package CSIT321.CN03.Repository;

import CSIT321.CN03.Model.StaffMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffMemberRepository extends JpaRepository<StaffMember, Long> {

    default StaffMember findByUserName(String username) {
        System.out.println("Finding user by username: " + username);
        StaffMember staffMember = findByUserNameImpl(username);
        System.out.println("Found user: " + staffMember);
        return staffMember;
    }

    @Query("SELECT s FROM StaffMember s JOIN FETCH s.roles r JOIN FETCH r.permissions WHERE s.userName = ?1")
    StaffMember findByUserNameImpl(String username);
}
