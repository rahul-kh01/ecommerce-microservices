package com.ecommerce.gateway.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

/**
 * JWT Test Controller for Gateway Service
 * Provides test endpoints for JWT validation and propagation testing
 */
@RestController
@RequestMapping("/api/jwt-test")
public class JwtTestController {

    @GetMapping("/validate")
    public Mono<ResponseEntity<Map<String, Object>>> validateJwt() {
        return ReactiveSecurityContextHolder.getContext()
                .cast(org.springframework.security.core.context.SecurityContext.class)
                .map(securityContext -> {
                    Authentication authentication = securityContext.getAuthentication();
                    Map<String, Object> response = new HashMap<>();
                    
                    if (authentication != null && authentication.getPrincipal() instanceof Jwt) {
                        Jwt jwt = (Jwt) authentication.getPrincipal();
                        response.put("status", "success");
                        response.put("message", "JWT token is valid");
                        response.put("userId", jwt.getClaimAsString("sub"));
                        response.put("username", jwt.getClaimAsString("preferred_username"));
                        response.put("service", "gateway-service");
                        return ResponseEntity.ok(response);
                    } else {
                        response.put("status", "error");
                        response.put("message", "JWT token is invalid or missing");
                        return ResponseEntity.status(401).body(response);
                    }
                })
                .defaultIfEmpty(ResponseEntity.status(401).body(Map.of(
                        "status", "error",
                        "message", "JWT token is invalid or missing"
                )));
    }

    @GetMapping("/propagation")
    public Mono<ResponseEntity<Map<String, Object>>> testJwtPropagation() {
        return ReactiveSecurityContextHolder.getContext()
                .cast(org.springframework.security.core.context.SecurityContext.class)
                .map(securityContext -> {
                    Authentication authentication = securityContext.getAuthentication();
                    Map<String, Object> response = new HashMap<>();
                    
                    if (authentication != null && authentication.getPrincipal() instanceof Jwt) {
                        Jwt jwt = (Jwt) authentication.getPrincipal();
                        response.put("status", "success");
                        response.put("message", "JWT token propagation working");
                        response.put("userId", jwt.getClaimAsString("sub"));
                        response.put("username", jwt.getClaimAsString("preferred_username"));
                        response.put("service", "gateway-service");
                        response.put("jwtPropagation", "working");
                        return ResponseEntity.ok(response);
                    } else {
                        response.put("status", "error");
                        response.put("message", "JWT token propagation failed");
                        return ResponseEntity.status(401).body(response);
                    }
                })
                .defaultIfEmpty(ResponseEntity.status(401).body(Map.of(
                        "status", "error",
                        "message", "JWT token propagation failed"
                )));
    }

    @GetMapping("/health")
    public Mono<ResponseEntity<Map<String, Object>>> jwtHealth() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "healthy");
        response.put("service", "gateway-service");
        response.put("jwtEnabled", true);
        return Mono.just(ResponseEntity.ok(response));
    }
}
