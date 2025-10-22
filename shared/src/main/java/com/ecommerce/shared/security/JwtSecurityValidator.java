package com.ecommerce.shared.security;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;
import java.util.Map;

/**
 * JWT Security Validator
 * Validates JWT tokens and security configurations
 */
@Component
public class JwtSecurityValidator {
    
    private static final String EXPECTED_ISSUER = "http://localhost:8080/realms/ecom-app";
    private static final String EXPECTED_AUDIENCE = "ecom-app";
    private static final String EXPECTED_RESOURCE_ACCESS_KEY = "ecom-app";
    
    /**
     * Validate JWT token structure and claims
     * @param jwt JWT token to validate
     * @return Validation result
     */
    public JwtValidationResult validateJwt(Jwt jwt) {
        JwtValidationResult result = new JwtValidationResult();
        
        // Check issuer
        String issuer = jwt.getClaimAsString("iss");
        if (!EXPECTED_ISSUER.equals(issuer)) {
            result.addError("Invalid issuer: " + issuer);
        }
        
        // Check audience
        String audience = jwt.getClaimAsString("aud");
        if (!EXPECTED_AUDIENCE.equals(audience)) {
            result.addError("Invalid audience: " + audience);
        }
        
        // Check expiration
        Instant exp = jwt.getExpiresAt();
        if (exp != null && exp.isBefore(Instant.now())) {
            result.addError("Token has expired");
        }
        
        // Check required claims
        if (jwt.getClaimAsString("sub") == null) {
            result.addError("Missing 'sub' claim");
        }
        
        if (jwt.getClaimAsString("preferred_username") == null) {
            result.addError("Missing 'preferred_username' claim");
        }
        
        // Check resource access structure
        Map<String, Object> resourceAccess = jwt.getClaimAsMap("resource_access");
        if (resourceAccess == null) {
            result.addError("Missing 'resource_access' claim");
        } else {
            if (!resourceAccess.containsKey(EXPECTED_RESOURCE_ACCESS_KEY)) {
                result.addError("Missing 'ecom-app' in resource_access");
            } else {
                Map<String, Object> ecomApp = (Map<String, Object>) resourceAccess.get(EXPECTED_RESOURCE_ACCESS_KEY);
                if (!ecomApp.containsKey("roles")) {
                    result.addError("Missing 'roles' in ecom-app resource_access");
                } else {
                    List<String> roles = (List<String>) ecomApp.get("roles");
                    if (roles == null || roles.isEmpty()) {
                        result.addError("No roles found in token");
                    }
                }
            }
        }
        
        return result;
    }
    
    /**
     * Validate JWT decoder configuration
     * @param jwtDecoder JWT decoder to validate
     * @return Validation result
     */
    public JwtValidationResult validateJwtDecoder(JwtDecoder jwtDecoder) {
        JwtValidationResult result = new JwtValidationResult();
        
        try {
            // Test with a mock token (this would need to be implemented based on your test setup)
            // For now, we'll just check if the decoder is not null
            if (jwtDecoder == null) {
                result.addError("JWT decoder is null");
            }
        } catch (Exception e) {
            result.addError("JWT decoder validation failed: " + e.getMessage());
        }
        
        return result;
    }
    
    /**
     * Validate role extraction logic
     * @param jwt JWT token to test
     * @return Validation result
     */
    public JwtValidationResult validateRoleExtraction(Jwt jwt) {
        JwtValidationResult result = new JwtValidationResult();
        
        try {
            List<String> roles = JwtUtils.extractAuthorities(jwt).stream()
                    .map(auth -> auth.getAuthority().substring(5)) // Remove "ROLE_" prefix
                    .toList();
            
            if (roles.isEmpty()) {
                result.addError("No roles extracted from token");
            }
            
            // Check if roles are properly formatted
            for (String role : roles) {
                if (role == null || role.trim().isEmpty()) {
                    result.addError("Empty role found");
                }
            }
            
        } catch (Exception e) {
            result.addError("Role extraction failed: " + e.getMessage());
        }
        
        return result;
    }
    
    /**
     * JWT Validation Result
     */
    public static class JwtValidationResult {
        private final List<String> errors = new java.util.ArrayList<>();
        private final List<String> warnings = new java.util.ArrayList<>();
        
        public void addError(String error) {
            errors.add(error);
        }
        
        public void addWarning(String warning) {
            warnings.add(warning);
        }
        
        public boolean isValid() {
            return errors.isEmpty();
        }
        
        public List<String> getErrors() {
            return errors;
        }
        
        public List<String> getWarnings() {
            return warnings;
        }
        
        public String getSummary() {
            StringBuilder summary = new StringBuilder();
            if (!errors.isEmpty()) {
                summary.append("Errors: ").append(String.join(", ", errors));
            }
            if (!warnings.isEmpty()) {
                if (summary.length() > 0) summary.append("; ");
                summary.append("Warnings: ").append(String.join(", ", warnings));
            }
            return summary.toString();
        }
    }
}
