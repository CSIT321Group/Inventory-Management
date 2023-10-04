package CSIT321.CN03.API;

import CSIT321.CN03.Model.Employee.StaffMember;
import CSIT321.CN03.Service.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping(path = "/{id}")
    public StaffMember getStaffMemberById(@PathVariable Long id) {
        return staffService.getStaffMemberById(id);
    }

    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping
    public List<StaffMember> getAllStaffMembers() {
        return staffService.getAllStaffMembers();
    }

    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping(path = "/search/{searchText}")
    public List<StaffMember> searchStaffMembers(@PathVariable String searchText) {
        return staffService.searchStaffMembers(searchText);
    }
}
