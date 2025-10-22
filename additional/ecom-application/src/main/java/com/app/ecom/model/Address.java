package com.app.ecom.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Street is required")
    @Column(nullable = false, length = 255)
    private String street;
    
    @NotBlank(message = "City is required")
    @Column(nullable = false, length = 100)
    private String city;
    
    @NotBlank(message = "State is required")
    @Column(nullable = false, length = 100)
    private String state;
    
    @NotBlank(message = "Country is required")
    @Column(nullable = false, length = 100)
    private String country;
    
    @NotBlank(message = "Zipcode is required")
    @Pattern(regexp = "^\\d{5}(-\\d{4})?$", message = "Zipcode should be valid (e.g., 12345 or 12345-6789)")
    @Column(nullable = false, length = 10)
    private String zipcode;
}
