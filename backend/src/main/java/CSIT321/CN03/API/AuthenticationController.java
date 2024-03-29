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

import java.util.*;
import java.util.stream.Collectors;
/**
 * This class serves as a REST Controller responsible for handling authentication-related operations.
 * It provides endpoints for user authentication, role-based access control, and user information retrieval.
 */
@RestController  // Indicates that this class is a REST Controller
@RequestMapping("/api/test")  // Maps this controller to the /api/test route
@RequiredArgsConstructor  // Lombok annotation to generate a constructor with required fields
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager; // Used to authenticate users
    private final JwtUtil jwtUtil;  // Utility class to deal with JWTs
    private final UserDetailsService userDetailsService;  // Spring Security interface to load user-specific data

    /**
     * Endpoint to test user roles. Only users with 'ROLE_USER' or 'ROLE_ADMIN' authority can access this method.
     *
     * @return A ResponseEntity containing a message with the roles of the authenticated user.
     */
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")  // This method can be accessed only by users with 'ROLE_USER' or 'ROLE_ADMIN' authority
    @GetMapping  // Maps HTTP GET requests onto this method
    public ResponseEntity<String> helloTest() {  // Method to test user roles
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();  // Retrieve the current Authentication
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();  // Get the authorities of the authenticated user
        List<String> roles = authorities.stream()
                .map(GrantedAuthority::getAuthority).toList();  // Convert the authorities to a list of role names
        return ResponseEntity.ok("Hello, mate! Your roles: " + roles);  // Respond with the roles of the authenticated user
    }

    /**
     * Endpoint for user authentication. It handles user login and issues a JWT token upon successful authentication.
     *
     * @param request   The authentication request containing user credentials.
     * @param response  The HTTP response used to set an HttpOnly JWT cookie.
     * @return A ResponseEntity containing a message and the JWT token upon successful login.
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> authenticate(@RequestBody AuthRequest request, HttpServletResponse response) {
        System.out.println("Attempting authentication for user: " + request.getUserName());

        // Authenticate the user
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword()));

        // Load the user details
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUserName());

        if (userDetails != null) {
            // Convert the authorities to a list of role names
            List<String> authorities = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            // Generate the JWT token
            String jwtToken = jwtUtil.generateToken(userDetails.getUsername(), authorities);

            // Set the JWT token as an HttpOnly cookie in the response
            Cookie cookie = new Cookie("jwt", jwtToken);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            response.addCookie(cookie);

            // Create a map to store the response
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "Login successful");
            responseBody.put("token", jwtToken);
            return ResponseEntity.ok(responseBody);
        }
        Map<String, String> errorBody = new HashMap<>();
        errorBody.put("message", "An error has occurred");
        return ResponseEntity.status(400).body(errorBody);  // Respond with an error if the user details could not be loaded
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

    /**
     * Endpoint for user logout. It deletes the JWT cookie to log the user out.
     *
     * @param response  The HTTP response used to remove the JWT cookie.
     * @return A ResponseEntity indicating successful logout.
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {

        // Create a cookie with the same name as the JWT cookie, set its max age to 0 to delete it
        Cookie cookie = new Cookie("jwt", "");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);  // Set cookie's age to 0 to remove it
        cookie.setPath("/");

        // Add the cookie to the response
        response.addCookie(cookie);

        return ResponseEntity.ok("Logged out successfully");
    }

    /**
     * Endpoint to retrieve the roles of the currently authenticated user.
     *
     * @return A ResponseEntity containing a list of role names for the authenticated user.
     */
    @GetMapping("/current-user-roles")
    public ResponseEntity<List<String>> currentUserRoles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            List<String> roles = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(roles);
        }

        return ResponseEntity.status(403).body(Collections.emptyList());
    }

}
