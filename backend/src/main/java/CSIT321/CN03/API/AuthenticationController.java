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

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<String> helloTest() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        List<String> roles = authorities.stream()
                .map(GrantedAuthority::getAuthority).toList();
        return ResponseEntity.ok("Hello, mate! Your roles: " + roles);
    }


    @PostMapping("/login")
    public ResponseEntity<String> authenticate(@RequestBody AuthRequest request, HttpServletResponse response) {
        System.out.println("Attempting authentication for user: " + request.getUserName());
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword()));
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUserName());
        if (userDetails != null) {
            List<String> authorities = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
            String jwtToken = jwtUtil.generateToken(userDetails.getUsername(), authorities);

            // Set the JWT token as an HttpOnly cookie in the response
            Cookie cookie = new Cookie("jwt", jwtToken);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            response.addCookie(cookie);

            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.status(400).body("An error has occurred");
    }



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