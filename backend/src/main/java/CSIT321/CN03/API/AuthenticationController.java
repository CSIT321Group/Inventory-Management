package CSIT321.CN03.API;

import CSIT321.CN03.Config.AuthRequest;
import CSIT321.CN03.Config.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController  // Indicates that this class is a REST Controller
@RequestMapping("/api/test")  // Maps this controller to the /api/test route
@RequiredArgsConstructor  // Lombok annotation to generate a constructor with required fields
public class AuthenticationController {

    private final AuthenticationManager authenticationManager; // Used to authenticate users
    private final JwtUtil jwtUtil;  // Utility class to deal with JWTs
    private final UserDetailsService userDetailsService;  // Spring Security interface to load user-specific data

    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")  // This method can be accessed only by users with 'ROLE_USER' or 'ROLE_ADMIN' authority
    @GetMapping  // Maps HTTP GET requests onto this method
    public ResponseEntity<String> helloTest() {  // Method to test user roles
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();  // Retrieve the current Authentication
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();  // Get the authorities of the authenticated user
        List<String> roles = authorities.stream()
                .map(GrantedAuthority::getAuthority).toList();  // Convert the authorities to a list of role names
        return ResponseEntity.ok("Hello, mate! Your roles: " + roles);  // Respond with the roles of the authenticated user
    }

    @PostMapping("/login")  // Maps HTTP POST requests onto this method for the /login endpoint
    public ResponseEntity<String> authenticate(@RequestBody AuthRequest request, HttpServletResponse response) {  // Method to authenticate the user
        System.out.println("Attempting authentication for user: " + request.getUserName());
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword()));  // Authenticate the user
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUserName());  // Load the user details
        if (userDetails != null) {
            List<String> authorities = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());  // Convert the authorities to a list of role names
            String jwtToken = jwtUtil.generateToken(userDetails.getUsername(), authorities);  // Generate the JWT token

            // Set the JWT token as an HttpOnly cookie in the response
            Cookie cookie = new Cookie("jwt", jwtToken);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            response.addCookie(cookie);

            return ResponseEntity.ok("Login successful");  // Respond with success message
        }
        return ResponseEntity.status(400).body("An error has occurred");  // Respond with an error if the user details could not be loaded
    }

    // The following endpoints can be accessed only by users with specific authorities
    @GetMapping("/user-test")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<?> userTest() {
        return ResponseEntity.ok("You have made it USER");
    }

    @GetMapping("/admin-test")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> adminTest() {
        return ResponseEntity.ok("You have made it ADMIN");
    }

    @GetMapping("/inventory")
    @PreAuthorize("hasAuthority('Inventory')")
    public ResponseEntity<?> inventory() {
        return ResponseEntity.ok("You have access to inventory");
    }

    @GetMapping("/order")
    @PreAuthorize("hasAuthority('Order')")
    public ResponseEntity<?> order() {
        return ResponseEntity.ok("You have access to orders");
    }

    @GetMapping("/reporting")
    @PreAuthorize("hasAuthority('Reporting')")
    public ResponseEntity<?> report() {
        return ResponseEntity.ok("You have access to reporting");
    }

    @GetMapping("/empinfo")
    @PreAuthorize("hasAuthority('EmployeeInfo')")
    public ResponseEntity<?> empInfo() {
        return ResponseEntity.ok("You have access to employeeInfo");
    }
}
