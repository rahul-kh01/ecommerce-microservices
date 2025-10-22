package com.ecommerce.user.dto;

import com.ecommerce.user.models.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UserResponse {
    @NotBlank(message = "User ID is required")
    private String id;
    
    @NotBlank(message = "Keycloak ID is required")
    private String keyCloakId;
    
    @NotBlank(message = "First name is required")
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    private String lastName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Phone number should be valid")
    private String phone;
    
    @NotNull(message = "Role is required")
    private UserRole role;
    
    private AddressDTO address;
}
