package com.app.ecom.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class AddressDTO {
    @NotBlank(message = "Street is required")
    private String street;
    
    @NotBlank(message = "City is required")
    private String city;
    
    @NotBlank(message = "State is required")
    private String state;
    
    @NotBlank(message = "Country is required")
    private String country;
    
    @NotBlank(message = "Zipcode is required")
    @Pattern(regexp = "^\\d{5}(-\\d{4})?$", message = "Zipcode should be valid (e.g., 12345 or 12345-6789)")
    private String zipcode;
}
