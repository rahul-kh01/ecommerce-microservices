package com.ecommerce.shared.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service for JWT token validation and user information extraction
 * Provides consistent JWT handling across all services
 */
@Service
public class JwtValidationService {
    
    /**
     * Get current authenticated user's JWT token
     * @return JWT token or null if not authenticated
     */
    public Jwt getCurrentJwt() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Jwt) {
            return (Jwt) authentication.getPrincipal();
        }
        return null;
    }
    
    /**
     * Get current user ID
     * @return User ID or null if not authenticated
     */
    public String getCurrentUserId() {
        Jwt jwt = getCurrentJwt();
        return jwt != null ? JwtUtils.extractUserId(jwt) : null;
    }
    
    /**
     * Get current username
     * @return Username or null if not authenticated
     */
    public String getCurrentUsername() {
        Jwt jwt = getCurrentJwt();
        return jwt != null ? JwtUtils.extractUsername(jwt) : null;
    }
    
    /**
     * Get current user email
     * @return Email or null if not authenticated
     */
    public String getCurrentUserEmail() {
        Jwt jwt = getCurrentJwt();
        return jwt != null ? JwtUtils.extractEmail(jwt) : null;
    }
    
    /**
     * Check if current user has specific role
     * @param role Role to check (without ROLE_ prefix)
     * @return true if user has the role
     */
    public boolean hasRole(String role) {
        Jwt jwt = getCurrentJwt();
        return jwt != null && JwtUtils.hasRole(jwt, role);
    }
    
    /**
     * Check if current user has any of the specified roles
     * @param roles Roles to check (without ROLE_ prefix)
     * @return true if user has any of the roles
     */
    public boolean hasAnyRole(String... roles) {
        Jwt jwt = getCurrentJwt();
        return jwt != null && JwtUtils.hasAnyRole(jwt, roles);
    }
    
    /**
     * Get all roles for current user
     * @return List of roles (without ROLE_ prefix)
     */
    public List<String> getCurrentUserRoles() {
        Jwt jwt = getCurrentJwt();
        if (jwt != null) {
            return JwtUtils.extractAuthorities(jwt).stream()
                    .map(auth -> auth.getAuthority().substring(5)) // Remove "ROLE_" prefix
                    .toList();
        }
        return List.of();
    }
    
    /**
     * Check if user is authenticated
     * @return true if user is authenticated
     */
    public boolean isAuthenticated() {
        return getCurrentJwt() != null;
    }
    
    /**
     * Validate JWT token and extract user information
     * @return User information or null if token is invalid
     */
    public UserInfo getCurrentUserInfo() {
        Jwt jwt = getCurrentJwt();
        if (jwt != null) {
            return new UserInfo(
                    JwtUtils.extractUserId(jwt),
                    JwtUtils.extractUsername(jwt),
                    JwtUtils.extractEmail(jwt),
                    getCurrentUserRoles()
            );
        }
        return null;
    }
    
    /**
     * User information record
     */
    public record UserInfo(
            String userId,
            String username,
            String email,
            List<String> roles
    ) {}
}
