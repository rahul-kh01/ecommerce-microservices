package com.ecommerce.gateway.filters;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

/**
 * Gateway JWT Token Forwarding Filter
 * Ensures JWT tokens are properly forwarded to downstream services
 */
@Component
public class JwtTokenForwardingFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        
        // Get the Authorization header from the incoming request
        String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // Create a new request with the same Authorization header
            ServerHttpRequest modifiedRequest = request.mutate()
                    .header(HttpHeaders.AUTHORIZATION, authHeader)
                    .build();
            
            // Create a new exchange with the modified request
            ServerWebExchange modifiedExchange = exchange.mutate()
                    .request(modifiedRequest)
                    .build();
            
            return chain.filter(modifiedExchange);
        }
        
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        // Set high priority to ensure JWT token forwarding happens early
        return -1000;
    }
}
