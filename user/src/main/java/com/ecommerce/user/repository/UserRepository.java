package com.ecommerce.user.repository;

import com.ecommerce.user.models.User;
import com.ecommerce.user.models.UserRole;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    
    Optional<User> findByKeycloakId(String keycloakId);
    
    List<User> findByRole(UserRole role);
    
    List<User> findByFirstNameContainingIgnoreCase(String firstName);
    
    List<User> findByLastNameContainingIgnoreCase(String lastName);
    
    @Query("{ 'email': { $regex: ?0, $options: 'i' } }")
    List<User> findByEmailContainingIgnoreCase(String email);
    
    @Query("{ 'createdAt': { $gte: ?0 } }")
    List<User> findByCreatedAtAfter(LocalDateTime date);
    
    @Query("{ 'role': ?0, 'createdAt': { $gte: ?1 } }")
    List<User> findByRoleAndCreatedAtAfter(UserRole role, LocalDateTime date);
    
    boolean existsByEmail(String email);
    
    boolean existsByKeycloakId(String keycloakId);
}
