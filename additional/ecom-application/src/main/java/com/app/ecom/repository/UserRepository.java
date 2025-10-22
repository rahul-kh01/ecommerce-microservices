package com.app.ecom.repository;

import com.app.ecom.model.User;
import com.app.ecom.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
    List<User> findByRole(UserRole role);
    
    List<User> findByFirstNameContainingIgnoreCase(String firstName);
    
    List<User> findByLastNameContainingIgnoreCase(String lastName);
    
    @Query("SELECT u FROM User u WHERE LOWER(u.email) LIKE LOWER(CONCAT('%', :email, '%'))")
    List<User> findByEmailContainingIgnoreCase(@Param("email") String email);
    
    @Query("SELECT u FROM User u WHERE u.createdAt >= :date")
    List<User> findByCreatedAtAfter(@Param("date") LocalDateTime date);
    
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.createdAt >= :date")
    List<User> findByRoleAndCreatedAtAfter(@Param("role") UserRole role, @Param("date") LocalDateTime date);
    
    boolean existsByEmail(String email);
}
