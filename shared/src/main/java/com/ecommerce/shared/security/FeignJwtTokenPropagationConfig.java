package com.ecommerce.shared.security;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

/**
 * Feign Client JWT Token Propagation Configuration
 * Automatically forwards JWT tokens in Feign client requests
 */
@Configuration
public class FeignJwtTokenPropagationConfig {

    @Bean
    public RequestInterceptor jwtTokenPropagationInterceptor() {
        return new RequestInterceptor() {
            @Override
            public void apply(RequestTemplate template) {
                // Get current authentication
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                
                if (authentication != null && authentication.getPrincipal() instanceof Jwt) {
                    Jwt jwt = (Jwt) authentication.getPrincipal();
                    
                    // Forward the JWT token in the Authorization header
                    String tokenValue = jwt.getTokenValue();
                    template.header("Authorization", "Bearer " + tokenValue);
                }
            }
        };
    }
}
