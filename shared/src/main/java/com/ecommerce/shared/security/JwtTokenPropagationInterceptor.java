package com.ecommerce.shared.security;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * JWT Token Propagation Interceptor
 * Automatically forwards JWT tokens in inter-service communication
 */
@Component
public class JwtTokenPropagationInterceptor implements ClientHttpRequestInterceptor {

    @Override
    public ClientHttpResponse intercept(
            HttpRequest request, 
            byte[] body, 
            ClientHttpRequestExecution execution) throws IOException {
        
        // Get current authentication
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication != null && authentication.getPrincipal() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            
            // Forward the JWT token in the Authorization header
            String tokenValue = jwt.getTokenValue();
            request.getHeaders().set(HttpHeaders.AUTHORIZATION, "Bearer " + tokenValue);
        }
        
        return execution.execute(request, body);
    }
}
