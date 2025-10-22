package com.ecommerce.shared.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Base security configuration with standardized JWT handling
 * All services should extend this class for consistent security implementation
 */
@Configuration
public abstract class BaseSecurityConfig {
    
    private static final String JWT_ISSUER_URI = "http://localhost:8080/realms/ecom-app";
    private static final String JWK_SET_URI = "http://localhost:8080/realms/ecom-app/protocol/openid-connect/certs";
    private static final String RESOURCE_ACCESS_KEY = "ecom-app";
    private static final String AUTHORITY_PREFIX = "ROLE_";
    
    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withJwkSetUri(JWK_SET_URI).build();
    }
    
    @Bean
    public Converter<Jwt, AbstractAuthenticationToken> jwtAuthenticationConverter() {
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(this::extractAuthorities);
        return jwtAuthenticationConverter;
    }
    
    /**
     * Extract authorities from JWT token
     */
    private List<GrantedAuthority> extractAuthorities(Jwt jwt) {
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
     * Create security filter chain with standard configuration
     * Subclasses should override this method to add service-specific configurations
     */
    public SecurityFilterChain createSecurityFilterChain(HttpSecurity http, String[] permitAllPaths) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authz -> {
                    authz.requestMatchers("/actuator/**").permitAll();
                    if (permitAllPaths != null) {
                        authz.requestMatchers(permitAllPaths).permitAll();
                    }
                    authz.anyRequest().authenticated();
                })
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt
                                .decoder(jwtDecoder())
                                .jwtAuthenticationConverter(jwtAuthenticationConverter())
                        )
                )
                .build();
    }
    
    /**
     * Get standard permit-all paths for a service
     */
    protected String[] getStandardPermitAllPaths() {
        return new String[]{
                "/actuator/**",
                "/health/**",
                "/info/**",
                "/metrics/**"
        };
    }
}
