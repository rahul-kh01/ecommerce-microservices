package com.ecommerce.product.repositories;

import com.ecommerce.product.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActiveTrue();

    @Query("SELECT p FROM Product p WHERE p.active = true AND p.stockQuantity > 0 AND LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProducts(@Param("keyword") String keyword);

    Optional<Product> findByIdAndActiveTrue(Long id);
    
    List<Product> findByCategoryAndActiveTrue(String category);
    
    List<Product> findByStockQuantityGreaterThanAndActiveTrue(Integer stockQuantity);
    
    @Query("SELECT p FROM Product p WHERE p.active = true AND p.stockQuantity > 0 ORDER BY p.createdAt DESC")
    List<Product> findActiveProductsOrderByCreatedAtDesc();
}
