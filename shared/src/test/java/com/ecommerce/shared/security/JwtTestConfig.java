package com.ecommerce.shared.security;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;

import java.time.Instant;
import java.util.List;
import java.util.Map;

/**
 * Test configuration for JWT testing across all services
 * Provides mock JWT tokens for testing
 */
@TestConfiguration
public class JwtTestConfig {
    
    @Bean
    @Primary
    public JwtDecoder testJwtDecoder() {
        return token -> createTestJwt(token);
    }
    
    private Jwt createTestJwt(String token) {
        // Create a test JWT with standard claims
        Instant now = Instant.now();
        Instant expiry = now.plusSeconds(3600); // 1 hour
        
        return Jwt.withTokenValue(token)
                .header("alg", "RS256")
                .header("typ", "JWT")
                .claim("sub", "test-user-id")
                .claim("preferred_username", "testuser")
                .claim("email", "test@example.com")
                .claim("resource_access", Map.of(
                        "ecom-app", Map.of(
                                "roles", List.of("USER", "ADMIN")
                        )
                ))
                .claim("iss", "http://localhost:8080/realms/ecom-app")
                .claim("aud", "ecom-app")
                .claim("iat", now.getEpochSecond())
                .claim("exp", expiry.getEpochSecond())
                .build();
    }
    
    /**
     * Create test JWT for specific user
     */
    public static Jwt createTestJwtForUser(String userId, String username, String... roles) {
        Instant now = Instant.now();
        Instant expiry = now.plusSeconds(3600);
        
        return Jwt.withTokenValue("test-token-" + userId)
                .header("alg", "RS256")
                .header("typ", "JWT")
                .claim("sub", userId)
                .claim("preferred_username", username)
                .claim("email", username + "@example.com")
                .claim("resource_access", Map.of(
                        "ecom-app", Map.of(
                                "roles", List.of(roles)
                        )
                ))
                .claim("iss", "http://localhost:8080/realms/ecom-app")
                .claim("aud", "ecom-app")
                .claim("iat", now.getEpochSecond())
                .claim("exp", expiry.getEpochSecond())
                .build();
    }
}
