package com.ecommerce.shared.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Comprehensive JWT Security Integration Test
 * Tests JWT functionality across all services
 */
@SpringBootTest
@ActiveProfiles("test")
class JwtSecurityIntegrationTest {

    @Autowired
    private JwtValidationService jwtValidationService;

    @Test
    void testJwtUtilsRoleExtraction() {
        // Create test JWT with roles
        Jwt testJwt = JwtTestConfig.createTestJwtForUser("test-user", "testuser", "USER", "CUSTOMER");
        
        // Test role extraction
        var authorities = JwtUtils.extractAuthorities(testJwt);
        assertEquals(2, authorities.size());
        assertTrue(authorities.stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_USER")));
        assertTrue(authorities.stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_CUSTOMER")));
    }

    @Test
    void testJwtUtilsUserInfoExtraction() {
        Jwt testJwt = JwtTestConfig.createTestJwtForUser("test-user", "testuser", "USER");
        
        // Test user info extraction
        assertEquals("test-user", JwtUtils.extractUserId(testJwt));
        assertEquals("testuser", JwtUtils.extractUsername(testJwt));
        assertEquals("testuser@example.com", JwtUtils.extractEmail(testJwt));
    }

    @Test
    void testJwtUtilsRoleChecking() {
        Jwt testJwt = JwtTestConfig.createTestJwtForUser("test-user", "testuser", "USER", "CUSTOMER");
        
        // Test role checking
        assertTrue(JwtUtils.hasRole(testJwt, "USER"));
        assertTrue(JwtUtils.hasRole(testJwt, "CUSTOMER"));
        assertFalse(JwtUtils.hasRole(testJwt, "ADMIN"));
        
        // Test any role checking
        assertTrue(JwtUtils.hasAnyRole(testJwt, "USER", "ADMIN"));
        assertTrue(JwtUtils.hasAnyRole(testJwt, "CUSTOMER", "SELLER"));
        assertFalse(JwtUtils.hasAnyRole(testJwt, "ADMIN", "MANAGER"));
    }

    @Test
    void testJwtValidationService() {
        // This test would require setting up security context
        // In a real test, you would mock the security context
        assertNotNull(jwtValidationService);
    }

    @Test
    void testJwtTokenStructure() {
        Jwt testJwt = JwtTestConfig.createTestJwtForUser("test-user", "testuser", "USER");
        
        // Test JWT structure
        assertNotNull(testJwt.getClaimAsString("sub"));
        assertNotNull(testJwt.getClaimAsString("preferred_username"));
        assertNotNull(testJwt.getClaimAsString("email"));
        assertNotNull(testJwt.getClaimAsMap("resource_access"));
        
        // Test resource access structure
        var resourceAccess = testJwt.getClaimAsMap("resource_access");
        assertTrue(resourceAccess.containsKey("ecom-app"));
        
        var ecomApp = (java.util.Map<String, Object>) resourceAccess.get("ecom-app");
        assertTrue(ecomApp.containsKey("roles"));
    }
}
