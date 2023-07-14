package CSIT321.CN03.Config;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter  // Lombok annotation to generate getters
@Setter  // Lombok annotation to generate setters
@NoArgsConstructor  // Lombok annotation to generate a no-args constructor
public class AuthRequest {

    private String userName;  // Field to store username
    private String password;  // Field to store password
}