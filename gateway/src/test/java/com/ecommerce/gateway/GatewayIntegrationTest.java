package com.ecommerce.gateway;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class GatewayIntegrationTest {

    @Test
    void contextLoads() {
        // This test will verify that the Spring context loads successfully
        // with the test profile configuration
    }
}
