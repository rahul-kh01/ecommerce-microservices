package com.app.ecom.controller;

import com.app.ecom.dto.CartItemRequest;
import com.app.ecom.model.CartItem;
import com.app.ecom.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Slf4j
public class CartController {

    private final CartService cartService;

    @PostMapping
    public ResponseEntity<String> addToCart(
            @RequestHeader("X-User-ID") String userId,
            @Valid @RequestBody CartItemRequest request) {
        try {
            log.info("Adding item to cart for user: {}", userId);
            if (!cartService.addToCart(userId, request)) {
                return ResponseEntity.badRequest().body("Product Out of Stock or User not found or Product not found");
            }
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            log.error("Error adding item to cart for user {}: {}", userId, e.getMessage());
            return ResponseEntity.badRequest().body("Failed to add item to cart: " + e.getMessage());
        }
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<Void> removeFromCart(
            @RequestHeader("X-User-ID") String userId,
            @PathVariable Long productId) {
        try {
            log.info("Removing item {} from cart for user: {}", productId, userId);
            boolean deleted = cartService.deleteItemFromCart(userId, productId);
            return deleted ? ResponseEntity.noContent().build()
                    : ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error removing item {} from cart for user {}: {}", productId, userId, e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(
            @RequestHeader("X-User-ID") String userId) {
        try {
            log.info("Getting cart for user: {}", userId);
            return ResponseEntity.ok(cartService.getCart(userId));
        } catch (Exception e) {
            log.error("Error getting cart for user {}: {}", userId, e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

}
