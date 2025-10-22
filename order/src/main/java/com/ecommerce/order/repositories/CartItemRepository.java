package com.ecommerce.order.repositories;

import com.ecommerce.order.models.CartItem;
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
    Optional<CartItem> findByUserIdAndProductId(String userId, String productId);

    @Modifying
    @Transactional
    void deleteByUserIdAndProductId(String userId, String productId);

    List<CartItem> findByUserId(String userId);
    
    List<CartItem> findByUserIdOrderByCreatedAtDesc(String userId);

    @Modifying
    @Transactional
    void deleteByUserId(String userId);
    
    @Query("SELECT c FROM CartItem c WHERE c.userId = :userId AND c.createdAt >= :since ORDER BY c.createdAt DESC")
    List<CartItem> findByUserIdAndCreatedAtAfter(@Param("userId") String userId, 
                                                @Param("since") LocalDateTime since);
    
    @Query("SELECT COUNT(c) FROM CartItem c WHERE c.userId = :userId")
    Long countByUserId(@Param("userId") String userId);
    
    @Query("SELECT SUM(c.price * c.quantity) FROM CartItem c WHERE c.userId = :userId")
    BigDecimal getTotalPriceByUserId(@Param("userId") String userId);
}
