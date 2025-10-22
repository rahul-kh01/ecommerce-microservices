package com.app.ecom.repository;

import com.app.ecom.model.CartItem;
import com.app.ecom.model.Product;
import com.app.ecom.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByUserAndProduct(User user, Product product);

    @Modifying
    @Transactional
    void deleteByUserAndProduct(User user, Product product);

    List<CartItem> findByUser(User user);
    
    List<CartItem> findByUserOrderByCreatedAtDesc(User user);

    @Modifying
    @Transactional
    void deleteByUser(User user);
    
    @Query("SELECT c FROM CartItem c WHERE c.user = :user AND c.createdAt >= :since ORDER BY c.createdAt DESC")
    List<CartItem> findByUserAndCreatedAtAfter(@Param("user") User user, 
                                              @Param("since") LocalDateTime since);
    
    @Query("SELECT COUNT(c) FROM CartItem c WHERE c.user = :user")
    Long countByUser(@Param("user") User user);
    
    @Query("SELECT SUM(c.price * c.quantity) FROM CartItem c WHERE c.user = :user")
    BigDecimal getTotalPriceByUser(@Param("user") User user);
}
