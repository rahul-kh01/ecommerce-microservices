package com.ecommerce.gateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("standalone")
public class SimpleGatewayConfig {

    @Bean
    public RouteLocator simpleRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("product-service", r -> r
                        .path("/api/products/**")
                        .uri("http://localhost:8081"))
                .route("user-service", r -> r
                        .path("/api/users/**")
                        .uri("http://localhost:8082"))
                .route("order-service", r -> r
                        .path("/api/orders/**", "/api/cart/**")
                        .uri("http://localhost:8083"))
                .route("fallback", r -> r
                        .path("/fallback/**")
                        .uri("http://httpbin.org/status/503"))
                .build();
    }
}
