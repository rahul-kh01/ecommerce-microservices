package com.ecommerce.user.controller;

import com.ecommerce.shared.security.JwtValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * JWT Test Controller for User Service
 * Provides test endpoints for JWT validation and propagation testing
 */
@RestController
@RequestMapping("/api/jwt-test")
public class JwtTestController {

    @Autowired
    private JwtValidationService jwtValidationService;

    @GetMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateJwt() {
        Map<String, Object> response = new HashMap<>();
        
        if (jwtValidationService.isAuthenticated()) {
            response.put("status", "success");
            response.put("message", "JWT token is valid");
            response.put("userId", jwtValidationService.getCurrentUserId());
            response.put("username", jwtValidationService.getCurrentUsername());
            response.put("roles", jwtValidationService.getCurrentUserRoles());
            response.put("service", "user-service");
            return ResponseEntity.ok(response);
        } else {
            response.put("status", "error");
            response.put("message", "JWT token is invalid or missing");
            return ResponseEntity.status(401).body(response);
        }
    }

    @GetMapping("/propagation")
    public ResponseEntity<Map<String, Object>> testJwtPropagation() {
        Map<String, Object> response = new HashMap<>();
        
        if (jwtValidationService.isAuthenticated()) {
            response.put("status", "success");
            response.put("message", "JWT token propagation working");
            response.put("userId", jwtValidationService.getCurrentUserId());
            response.put("username", jwtValidationService.getCurrentUsername());
            response.put("roles", jwtValidationService.getCurrentUserRoles());
            response.put("service", "user-service");
            response.put("jwtPropagation", "working");
            return ResponseEntity.ok(response);
        } else {
            response.put("status", "error");
            response.put("message", "JWT token propagation failed");
            return ResponseEntity.status(401).body(response);
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> jwtHealth() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "healthy");
        response.put("service", "user-service");
        response.put("jwtEnabled", true);
        return ResponseEntity.ok(response);
    }
}
