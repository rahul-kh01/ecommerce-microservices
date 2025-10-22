package com.ecommerce.order.repositories;

import com.ecommerce.order.models.Order;
import com.ecommerce.order.models.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(String userId);
    
    List<Order> findByUserIdOrderByCreatedAtDesc(String userId);
    
    List<Order> findByStatus(OrderStatus status);
    
    List<Order> findByUserIdAndStatus(String userId, OrderStatus status);
    
    @Query("SELECT o FROM Order o WHERE o.userId = :userId AND o.createdAt BETWEEN :startDate AND :endDate ORDER BY o.createdAt DESC")
    List<Order> findByUserIdAndCreatedAtBetween(@Param("userId") String userId, 
                                               @Param("startDate") LocalDateTime startDate, 
                                               @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT o FROM Order o WHERE o.status = :status AND o.createdAt >= :since ORDER BY o.createdAt DESC")
    List<Order> findByStatusAndCreatedAtAfter(@Param("status") OrderStatus status, 
                                            @Param("since") LocalDateTime since);
    
    Optional<Order> findByIdAndUserId(Long id, String userId);
}
