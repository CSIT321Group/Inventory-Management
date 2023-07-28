package CSIT321.CN03.Service;

import CSIT321.CN03.Model.StaffMember;
import CSIT321.CN03.Repository.StaffMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService {

    @Autowired
    private StaffMemberRepository staffMemberRepository;
    public StaffMember getStaffMemberById(Long id) {
        return staffMemberRepository.findById(id).orElse(null);
    }

    public List<StaffMember> getAllStaffMembers() {
        return staffMemberRepository.findAll();
    }
}
