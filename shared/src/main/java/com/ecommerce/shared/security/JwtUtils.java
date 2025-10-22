package com.ecommerce.shared.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Standardized JWT utility class for consistent role extraction across all services
 */
public class JwtUtils {
    
    private static final String RESOURCE_ACCESS_KEY = "ecom-app";
    private static final String ROLES_CLAIM_PATH = "resource_access.ecom-app.roles";
    private static final String AUTHORITY_PREFIX = "ROLE_";
    
    /**
     * Extract roles from JWT token in a standardized way
     * @param jwt JWT token
     * @return List of granted authorities
     */
    public static List<GrantedAuthority> extractAuthorities(Jwt jwt) {
        try {
            List<String> roles = jwt.getClaimAsMap("resource_access")
                    .entrySet().stream()
                    .filter(entry -> entry.getKey().equals(RESOURCE_ACCESS_KEY))
                    .flatMap(entry -> ((Map<String, List<String>>) entry.getValue())
                            .get("roles").stream())
                    .collect(Collectors.toList());

            return roles.stream()
                    .map(role -> new SimpleGrantedAuthority(AUTHORITY_PREFIX + role))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            // Return empty list if role extraction fails
            return List.of();
        }
    }
    
    /**
     * Extract user ID from JWT token
     * @param jwt JWT token
     * @return User ID or null if not found
     */
    public static String extractUserId(Jwt jwt) {
        return jwt.getClaimAsString("sub");
    }
    
    /**
     * Extract username from JWT token
     * @param jwt JWT token
     * @return Username or null if not found
     */
    public static String extractUsername(Jwt jwt) {
        return jwt.getClaimAsString("preferred_username");
    }
    
    /**
     * Extract email from JWT token
     * @param jwt JWT token
     * @return Email or null if not found
     */
    public static String extractEmail(Jwt jwt) {
        return jwt.getClaimAsString("email");
    }
    
    /**
     * Check if user has specific role
     * @param jwt JWT token
     * @param role Role to check (without ROLE_ prefix)
     * @return true if user has the role
     */
    public static boolean hasRole(Jwt jwt, String role) {
        List<GrantedAuthority> authorities = extractAuthorities(jwt);
        return authorities.stream()
                .anyMatch(auth -> auth.getAuthority().equals(AUTHORITY_PREFIX + role));
    }
    
    /**
     * Check if user has any of the specified roles
     * @param jwt JWT token
     * @param roles Roles to check (without ROLE_ prefix)
     * @return true if user has any of the roles
     */
    public static boolean hasAnyRole(Jwt jwt, String... roles) {
        List<GrantedAuthority> authorities = extractAuthorities(jwt);
        return authorities.stream()
                .anyMatch(auth -> {
                    String authority = auth.getAuthority();
                    for (String role : roles) {
                        if (authority.equals(AUTHORITY_PREFIX + role)) {
                            return true;
                        }
                    }
                    return false;
                });
    }
}
