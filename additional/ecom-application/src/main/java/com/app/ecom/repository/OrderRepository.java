package com.app.ecom.repository;

import com.app.ecom.model.Order;
import com.app.ecom.model.OrderStatus;
import com.app.ecom.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    
    List<Order> findByUserOrderByCreatedAtDesc(User user);
    
    List<Order> findByStatus(OrderStatus status);
    
    List<Order> findByUserAndStatus(User user, OrderStatus status);
    
    @Query("SELECT o FROM Order o WHERE o.user = :user AND o.createdAt BETWEEN :startDate AND :endDate ORDER BY o.createdAt DESC")
    List<Order> findByUserAndCreatedAtBetween(@Param("user") User user, 
                                             @Param("startDate") LocalDateTime startDate, 
                                             @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT o FROM Order o WHERE o.status = :status AND o.createdAt >= :since ORDER BY o.createdAt DESC")
    List<Order> findByStatusAndCreatedAtAfter(@Param("status") OrderStatus status, 
                                            @Param("since") LocalDateTime since);
    
    Optional<Order> findByIdAndUser(Long id, User user);
}
