package CSIT321.CN03.Service;

import CSIT321.CN03.Model.StaffMember;
import CSIT321.CN03.Repository.StaffMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service  // Indicates that this class is a Service
//@RequiredArgsConstructor
public class StaffMemberService implements UserDetailsService {  // Implementing UserDetailsService to load user-specific data

    private final StaffMemberRepository staffMemberRepository;  // Repository to access StaffMember data from the database

    @Autowired  // Autowiring the repository this can be omitted by using @RequiredArgsConstructor on top of the class declaration
    public StaffMemberService(StaffMemberRepository staffMemberRepository) {
        this.staffMemberRepository = staffMemberRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {  // Method to load user details by username
        StaffMember staffMember = staffMemberRepository.findByUserName(username);  // Retrieve the staff member with the provided username
        if (staffMember == null) {
            throw new UsernameNotFoundException("User not found");  // Throw an exception if the user could not be found
        }
        return staffMember;  // Return the found staff member
    }
}
