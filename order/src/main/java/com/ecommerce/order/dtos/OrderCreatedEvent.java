package com.ecommerce.order.dtos;

import com.ecommerce.order.models.OrderItem;
import com.ecommerce.order.models.OrderStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderCreatedEvent {
    @NotNull(message = "Order ID is required")
    private Long orderId;
    
    @NotBlank(message = "User ID is required")
    private String userId;
    
    @NotNull(message = "Order status is required")
    private OrderStatus status;
    
    @Valid
    private List<OrderItemDTO> items;
    
    @NotNull(message = "Total amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Total amount must be greater than 0")
    private BigDecimal totalAmount;
    
    @NotNull(message = "Created date is required")
    private LocalDateTime createdAt;
}
