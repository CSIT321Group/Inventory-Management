package CSIT321.CN03.Service;

import CSIT321.CN03.Model.Employee.StaffMember;
import CSIT321.CN03.Repository.Employee.StaffMemberRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService {

    @Autowired
    private StaffMemberRepository staffMemberRepository;
    public StaffMember getStaffMemberById(Long id) {

        return staffMemberRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Staff member not found with id: " + id));
    }

    public List<StaffMember> getAllStaffMembers() {
        return staffMemberRepository.findAll();
    }

    public List<StaffMember> searchStaffMembers(String searchText) { return staffMemberRepository.search(searchText); }
}
