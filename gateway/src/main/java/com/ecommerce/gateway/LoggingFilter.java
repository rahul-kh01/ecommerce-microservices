package com.ecommerce.gateway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.stereotype.Component;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Component
public class LoggingFilter implements GlobalFilter {

    private static final Logger logger = LoggerFactory.getLogger(LoggingFilter.class);

    public static final String CORRELATION_ID_HEADER = "X-Correlation-ID";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String correlationId = UUID.randomUUID().toString();
        ServerHttpRequest request = exchange.getRequest().mutate().header(CORRELATION_ID_HEADER, correlationId).build();
        ServerWebExchange mutatedExchange = exchange.mutate().request(request).build();
        logger.info("Incoming request to: {} with Correlation ID: {}", request.getPath(), correlationId);
        return chain.filter(mutatedExchange).then(Mono.fromRunnable(()->{
            exchange.getResponse().getHeaders().add(CORRELATION_ID_HEADER, correlationId);
        }));
    }
}
