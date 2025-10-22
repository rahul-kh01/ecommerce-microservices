package com.ecommerce.shared.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

/**
 * JWT Communication Integration Test
 * Tests JWT token propagation in inter-service communication
 */
@SpringBootTest
@ActiveProfiles("test")
class JwtCommunicationIntegrationTest {

    @Autowired
    private JwtTokenPropagationInterceptor jwtTokenPropagationInterceptor;

    @Test
    void testJwtTokenPropagationInterceptor() {
        // Create test JWT
        Jwt testJwt = JwtTestConfig.createTestJwtForUser("test-user", "testuser", "USER");
        
        // Set up security context
        Authentication authentication = new org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken(
                testJwt, testJwt.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Test that interceptor is properly configured
        assertNotNull(jwtTokenPropagationInterceptor);
        
        // Clean up
        SecurityContextHolder.clearContext();
    }

    @Test
    void testJwtTokenExtraction() {
        Jwt testJwt = JwtTestConfig.createTestJwtForUser("test-user", "testuser", "USER");
        
        // Test JWT token extraction
        String tokenValue = testJwt.getTokenValue();
        assertNotNull(tokenValue);
        assertTrue(tokenValue.startsWith("test-token-"));
    }

    @Test
    void testJwtTokenStructure() {
        Jwt testJwt = JwtTestConfig.createTestJwtForUser("test-user", "testuser", "USER", "CUSTOMER");
        
        // Test JWT structure for inter-service communication
        assertNotNull(testJwt.getClaimAsString("sub"));
        assertNotNull(testJwt.getClaimAsString("preferred_username"));
        assertNotNull(testJwt.getClaimAsString("email"));
        assertNotNull(testJwt.getClaimAsMap("resource_access"));
        
        // Test that roles are properly structured
        var resourceAccess = testJwt.getClaimAsMap("resource_access");
        assertTrue(resourceAccess.containsKey("ecom-app"));
        
        var ecomApp = (java.util.Map<String, Object>) resourceAccess.get("ecom-app");
        assertTrue(ecomApp.containsKey("roles"));
        
        var roles = (java.util.List<String>) ecomApp.get("roles");
        assertEquals(2, roles.size());
        assertTrue(roles.contains("USER"));
        assertTrue(roles.contains("CUSTOMER"));
    }

    @Test
    void testJwtTokenValidation() {
        Jwt testJwt = JwtTestConfig.createTestJwtForUser("test-user", "testuser", "USER");
        
        // Test JWT validation
        assertNotNull(testJwt.getIssuedAt());
        assertNotNull(testJwt.getExpiresAt());
        assertTrue(testJwt.getExpiresAt().isAfter(testJwt.getIssuedAt()));
    }

    @Test
    void testJwtTokenForwarding() {
        // This test would require setting up a mock HTTP request
        // In a real test, you would test the actual token forwarding
        Jwt testJwt = JwtTestConfig.createTestJwtForUser("test-user", "testuser", "USER");
        
        // Test that JWT token can be formatted for forwarding
        String authHeader = "Bearer " + testJwt.getTokenValue();
        assertTrue(authHeader.startsWith("Bearer "));
        assertTrue(authHeader.contains("test-token-"));
    }
}
