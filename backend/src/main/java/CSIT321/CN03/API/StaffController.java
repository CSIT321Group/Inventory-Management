package CSIT321.CN03.API;

import CSIT321.CN03.Model.Employee.StaffMember;
import CSIT321.CN03.Service.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * This class serves as a REST Controller responsible for handling staff-related operations.
 * It provides endpoints for retrieving staff members, searching for staff members, and more.
 */
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/staff")
@ControllerAdvice
public class StaffController {

    @Autowired
    private StaffService staffService;

    /**
     * Retrieves a staff member by their unique identifier.
     *
     * @param id The ID of the staff member to retrieve.
     * @return The staff member object with the specified ID.
     */
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping(path = "/{id}")
    public StaffMember getStaffMemberById(@PathVariable Long id) {
        return staffService.getStaffMemberById(id);
    }

    /**
     * Retrieves a list of all staff members.
     *
     * @return A list of all staff members in the system.
     */
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping
    public List<StaffMember> getAllStaffMembers() {
        return staffService.getAllStaffMembers();
    }

    /**
     * Searches for staff members based on the provided search text.
     *
     * @param searchText The text used to search for staff members.
     * @return A list of staff members that match the search criteria.
     */
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping(path = "/search/{searchText}")
    public List<StaffMember> searchStaffMembers(@PathVariable String searchText) {
        return staffService.searchStaffMembers(searchText);
    }
}
