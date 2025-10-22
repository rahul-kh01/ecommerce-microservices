package com.ecommerce.order.services;

import com.ecommerce.order.clients.ProductServiceClient;
import com.ecommerce.order.clients.UserServiceClient;
import com.ecommerce.order.dtos.ProductResponse;
import com.ecommerce.order.dtos.UserResponse;
import com.ecommerce.order.repositories.CartItemRepository;
import com.ecommerce.order.dtos.CartItemRequest;
import com.ecommerce.order.models.CartItem;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final ProductServiceClient productServiceClient;
    private final UserServiceClient userServiceClient;
    int attempt = 0;

//    @CircuitBreaker(name = "productService", fallbackMethod = "addToCartFallBack")
@Retry(name = "retryBreaker", fallbackMethod = "addToCartFallBack")
    public boolean addToCart(String userId, CartItemRequest request) {
        log.info("Attempt {}: Adding item to cart for user: {}", ++attempt, userId);
        
        // Validate external services first (outside transaction)
        ProductResponse productResponse = productServiceClient.getProductDetails(request.getProductId());
        if (productResponse == null || productResponse.getStockQuantity() < request.getQuantity())
            return false;

        UserResponse userResponse = userServiceClient.getUserDetails(userId);
        if (userResponse == null)
            return false;

        // Perform database operations in a separate transaction
        return updateCartInTransaction(userId, request, productResponse.getPrice());
    }

    @Transactional
    private boolean updateCartInTransaction(String userId, CartItemRequest request, BigDecimal price) {
        try {
            CartItem existingCartItem = cartItemRepository.findByUserIdAndProductId(userId, request.getProductId()).orElse(null);
            if (existingCartItem != null) {
                // Update the quantity
                existingCartItem.setQuantity(existingCartItem.getQuantity() + request.getQuantity());
                existingCartItem.setPrice(price);
                cartItemRepository.save(existingCartItem);
            } else {
                // Create new cart item
               CartItem cartItem = new CartItem();
               cartItem.setUserId(userId);
               cartItem.setProductId(request.getProductId());
               cartItem.setQuantity(request.getQuantity());
               cartItem.setPrice(price);
               cartItemRepository.save(cartItem);
            }
            return true;
        } catch (Exception e) {
            log.error("Error updating cart for user {}: {}", userId, e.getMessage());
            return false;
        }
    }

    public boolean addToCartFallBack(String userId,
                                     CartItemRequest request,
                                     Exception exception) {
        exception.printStackTrace();
        return false;
    }

    public boolean deleteItemFromCart(String userId, String productId) {
        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, productId).orElse(null);

        if (cartItem != null){
            cartItemRepository.delete(cartItem);
            return true;
        }
        return false;
    }

    public List<CartItem> getCart(String userId) {
        return cartItemRepository.findByUserId(userId);
    }

    public void clearCart(String userId) {
        cartItemRepository.deleteByUserId(userId);
    }
}
