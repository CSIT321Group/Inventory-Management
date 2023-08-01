package CSIT321.CN03.API;

import CSIT321.CN03.Model.StaffMember;
import CSIT321.CN03.Service.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/staff")
@ControllerAdvice
public class StaffController {

    @Autowired
    private StaffService staffService;

    @GetMapping(path = "/{id}")
    public StaffMember getStaffMemberById(@PathVariable Long id) {
        return staffService.getStaffMemberById(id);
    }

    @GetMapping
    public List<StaffMember> getAllStaffMembers() {
        return staffService.getAllStaffMembers();
    }

    @GetMapping(path = "/search/{searchText}")
    public List<StaffMember> searchStaffMembers(@PathVariable String searchText) {
        return staffService.searchStaffMembers(searchText);
    }
}
