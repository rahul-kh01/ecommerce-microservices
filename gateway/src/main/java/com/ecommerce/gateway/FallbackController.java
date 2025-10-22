package com.ecommerce.gateway;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @GetMapping("/products")
    public Mono<String> productFallback() {
        return Mono.just("Product service is temporarily unavailable. Please try again later.");
    }

    @GetMapping("/users")
    public Mono<String> userFallback() {
        return Mono.just("User service is temporarily unavailable. Please try again later.");
    }

    @GetMapping("/orders")
    public Mono<String> orderFallback() {
        return Mono.just("Order service is temporarily unavailable. Please try again later.");
    }
}