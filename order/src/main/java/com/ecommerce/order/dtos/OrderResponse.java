package com.ecommerce.order.dtos;

import com.ecommerce.order.models.OrderStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class OrderResponse {
    @NotNull(message = "Order ID is required")
    private Long id;
    
    @NotNull(message = "Total amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Total amount must be greater than 0")
    private BigDecimal totalAmount;
    
    @NotNull(message = "Order status is required")
    private OrderStatus status;
    
    @Valid
    private List<OrderItemDTO> items;
    
    @NotNull(message = "Created date is required")
    private LocalDateTime createdAt;
}
