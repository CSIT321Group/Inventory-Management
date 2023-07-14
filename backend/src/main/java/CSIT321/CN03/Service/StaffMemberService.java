package CSIT321.CN03.Service;

import CSIT321.CN03.Model.StaffMember;
import CSIT321.CN03.Repository.StaffMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class StaffMemberService implements UserDetailsService {

    private final StaffMemberRepository staffMemberRepository;

    @Autowired
    public StaffMemberService(StaffMemberRepository staffMemberRepository) {
        this.staffMemberRepository = staffMemberRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        StaffMember staffMember = staffMemberRepository.findByUserName(username);
        if (staffMember == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return staffMember;
    }
}