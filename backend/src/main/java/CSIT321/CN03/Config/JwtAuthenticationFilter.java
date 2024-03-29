package CSIT321.CN03.Config;

import CSIT321.CN03.Repository.Employee.StaffMemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor  // Lombok annotation to generate a constructor requiring all final fields
@Configuration  // Indicates that a class declares one or more @Bean methods and may be processed by the Spring container
public class JwtAuthenticationFilter extends OncePerRequestFilter {  // Custom filter extending OncePerRequestFilter

    private final JwtUtil jwtUtil;  // JWT utility class
    private final StaffMemberRepository staffMemberRepository;  // Repository to query StaffMember data

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String token = null;

        // First try to extract JWT token from cookie
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {  // Iterating through the cookies
                if (cookie.getName().equals("jwt")) {  // If a cookie named "jwt" is found
                    token = cookie.getValue();  // Get the value of the cookie
                    break;
                }
            }
        }

        // If token is not found in cookies, look for it in the Authorization header
        if (token == null) {
            final String bearerToken = request.getHeader("Authorization");
            if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
                token = bearerToken.substring(7);  // Extract the part after "Bearer "
            }
        }

        if (token != null && jwtUtil.validateToken(token)) {
            String username = jwtUtil.extractUsername(token);  // Extract the username from the token
            List<String> roles = jwtUtil.extractRoles(token);  // Extract the roles from the token

            UserDetails userDetails = staffMemberRepository.findByUserName(username);  // Find the user in the repository

            if (userDetails != null) {  // If the user was found
                List<GrantedAuthority> authorities = roles.stream()
                        .map(role -> role.startsWith("ROLE_") ? role : "ROLE_" + role)
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());


                // Create an authentication token with the user and authorities
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
                // Set the authentication in the context
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        // Proceed with the filter chain
        filterChain.doFilter(request, response);
    }
}