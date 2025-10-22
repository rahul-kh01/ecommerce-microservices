# E-commerce Microservices Architecture

A comprehensive e-commerce microservices application built with Spring Boot, Spring Cloud, and modern cloud-native technologies.

## Architecture Overview

This application consists of the following microservices:

### Core Services
- **Gateway Service** (Port 8080) - API Gateway with routing, load balancing, and circuit breakers
- **User Service** (Port 8082) - User management with MongoDB
- **Product Service** (Port 8081) - Product catalog with PostgreSQL
- **Order Service** (Port 8083) - Order processing with PostgreSQL and Kafka
- **Notification Service** (Port 8084) - Event-driven notifications with Kafka

### Infrastructure Services
- **Eureka Server** (Port 8761) - Service discovery and registration
- **Config Server** (Port 8888) - Centralized configuration management
- **Keycloak** (Port 8080) - Authentication and authorization
- **Zipkin** (Port 9411) - Distributed tracing

### Data Stores
- **PostgreSQL** - Order and Product databases
- **MongoDB** - User database
- **Redis** - Gateway caching and rate limiting
- **Kafka** - Event streaming
- **RabbitMQ** - Message bus

## Prerequisites

- Java 21
- Maven 3.8+
- Docker and Docker Compose
- Git

## Quick Start

### 1. Start Infrastructure Services
```bash
docker-compose up -d
```

### 2. Start Microservices
```bash
./start-services.sh
```

### 3. Access Services
- **API Gateway**: http://localhost:8080
- **Eureka Dashboard**: http://localhost:8761
- **Config Server**: http://localhost:8888
- **Keycloak Admin**: http://localhost:8080
- **RabbitMQ Management**: http://localhost:15672
- **Zipkin Tracing**: http://localhost:9411

## Service Endpoints

### Gateway Routes
- `/api/users/**` → User Service
- `/api/products/**` → Product Service
- `/api/orders/**` → Order Service
- `/api/cart/**` → Order Service
- `/eureka/**` → Eureka Dashboard

### Individual Service Endpoints
- User Service: http://localhost:8082
- Product Service: http://localhost:8081
- Order Service: http://localhost:8083
- Notification Service: http://localhost:8084

## Configuration

### Database Configuration
- **Order DB**: PostgreSQL on port 5432
- **Product DB**: PostgreSQL on port 5434
- **User DB**: MongoDB on port 27017

### Security
All services are secured with OAuth2 using Keycloak:
- **Issuer URI**: http://localhost:8080/realms/ecom-app
- **Realm**: ecom-app

### Service Discovery
All services register with Eureka server at http://localhost:8761/eureka/

## Development

### Building Services
```bash
# Build all services
mvn clean install

# Build specific service
cd <service-name>
mvn clean install
```

### Running Services Individually
```bash
# Start infrastructure first
docker-compose up -d

# Start services in order
cd eureka && mvn spring-boot:run
cd configserver && mvn spring-boot:run
cd gateway && mvn spring-boot:run
cd user && mvn spring-boot:run
cd product && mvn spring-boot:run
cd order && mvn spring-boot:run
cd notification && mvn spring-boot:run
```

## Monitoring and Observability

- **Health Checks**: All services expose health endpoints at `/actuator/health`
- **Metrics**: Prometheus metrics available at `/actuator/prometheus`
- **Tracing**: Distributed tracing with Zipkin
- **Logging**: Structured logging with correlation IDs

## API Documentation

Each service exposes OpenAPI documentation at:
- `/swagger-ui.html` (if Swagger is enabled)
- `/v3/api-docs` (OpenAPI 3.0 specification)

## Troubleshooting

### Common Issues

1. **Service Discovery Issues**
   - Ensure Eureka server is running first
   - Check service registration in Eureka dashboard

2. **Database Connection Issues**
   - Verify database containers are running
   - Check connection strings in application.yml

3. **Gateway Routing Issues**
   - Check service names in gateway configuration
   - Verify services are registered with Eureka

4. **Authentication Issues**
   - Ensure Keycloak is running and configured
   - Check OAuth2 issuer URI configuration

### Logs
Check service logs for detailed error information:
```bash
# Docker logs
docker-compose logs <service-name>

# Maven logs
mvn spring-boot:run
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the logs
3. Check service health
4. Create an issue in the repository

---


**Happy Coding! 🚀**


