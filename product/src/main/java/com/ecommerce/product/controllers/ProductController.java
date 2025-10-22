package com.ecommerce.product.controllers;

import com.ecommerce.product.dtos.ProductRequest;
import com.ecommerce.product.dtos.ProductResponse;
import com.ecommerce.product.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
@Slf4j
public class ProductController {

    private final ProductService productService;

    @GetMapping("/simulate")
    public ResponseEntity<String> simulateFailure(
            @RequestParam(defaultValue = "false") boolean fail) {
        if (fail) {
            throw new RuntimeException("Simulated Failure For Testing");
        }
        return ResponseEntity.ok("Product Service is OK");
    }

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductRequest productRequest) {
        try {
            log.info("Creating product: {}", productRequest.getName());
            ProductResponse response = productService.createProduct(productRequest);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error creating product: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getProducts() {
        try {
            log.info("Fetching all products");
            return ResponseEntity.ok(productService.getAllProducts());
        } catch (Exception e) {
            log.error("Error fetching products: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(
                                    @PathVariable String id) {
        try {
            log.info("Fetching product with id: {}", id);
            return productService.getProductById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            log.error("Error fetching product {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest productRequest) {
        try {
            log.info("Updating product with id: {}", id);
            return productService.updateProduct(id, productRequest)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            log.error("Error updating product {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            log.info("Deleting product with id: {}", id);
            boolean deleted = productService.deleteProduct(id);
            return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error deleting product {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductResponse>> searchProducts(@RequestParam String keyword) {
        try {
            log.info("Searching products with keyword: {}", keyword);
            return ResponseEntity.ok(productService.searchProducts(keyword));
        } catch (Exception e) {
            log.error("Error searching products with keyword {}: {}", keyword, e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
