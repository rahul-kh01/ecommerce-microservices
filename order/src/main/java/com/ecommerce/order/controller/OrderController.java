package com.ecommerce.order.controller;

import com.ecommerce.order.dtos.OrderResponse;
import com.ecommerce.order.services.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
@Slf4j
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @AuthenticationPrincipal Jwt jwt) {
        try {
            String userId = jwt.getSubject();
            return orderService.createOrder(userId)
                    .map(orderResponse -> new ResponseEntity<>(orderResponse, HttpStatus.CREATED))
                    .orElseGet(() -> ResponseEntity.badRequest().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrder(@PathVariable Long id) {
        try {
            log.info("Getting order with id: {}", id);
            return orderService.getOrder(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            log.error("Error getting order {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
