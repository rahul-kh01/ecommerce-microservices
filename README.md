# E-commerce Microservices Ecosystem

A complete microservices architecture built with Spring Boot 3.x, featuring service discovery, API gateway, JWT authentication, event-driven communication, and comprehensive monitoring.

## 🏗️ Architecture Overview

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│     API Gateway     │     │    Config Server    │     │    Eureka Server    │
│     (Port 8085)     │     │     (Port 8888)     │     │     (Port 8761)     │
└─────────┬───────────┘     └─────────┬───────────┘     └─────────┬───────────┘
          │                             │                           │
          └─────────────────────────────┼───────────────────────────┘
                                        │
                           ┌────────────┴────────────┐
                           │                         │
                 ┌─────────▼────────┐      ┌─────────▼────────┐
                 │   Product Service │      │     User Service │
                 │      (8081)       │      │      (8082)      │
                 └─────────┬────────┘      └─────────┬────────┘
                           │                         │
                 ┌─────────▼────────┐      ┌─────────▼────────┐
                 │   PostgreSQL      │      │     MongoDB      │
                 │   Product DB      │      │     User DB      │
                 └───────────────────┘      └──────────────────┘

                           ┌────────────┴────────────┐
                           │                         │
                 ┌─────────▼────────┐      ┌─────────▼────────┐
                 │    Order Service │      │ Notification Svc │
                 │      (8083)      │      │      (8084)      │
                 └─────────┬────────┘      └─────────┬────────┘
                           │                         │
                 ┌─────────▼────────┐      ┌─────────▼────────┐
                 │   PostgreSQL      │      │      Kafka       │
                 │    Order DB       │      │    Events Bus    │
                 └───────────────────┘      └──────────────────┘

                                        │
                                        │
                                ┌───────▼────────┐
                                │    Keycloak    │
                                │    (Port 8080) │
                                └────────────────┘

```

## 🚀 Quick Start

### Prerequisites
- Java 21+
- Maven 3.8+
- Docker & Docker Compose
- Git

### One-Command Setup

```bash
# Clone the repository
git clone https://github.com/rahul-kh01/ecommerce-microservices
cd ecom-microservices

# Start everything with one command
make start
```

### Alternative: Using the startup script

```bash
# Make script executable and run
chmod +x start.sh
./start.sh
```

### Manual Setup (Step by Step)

```bash
# 1. Start infrastructure
docker-compose up -d

# 2. Build all services
make build

# 3. Start services in order
make start-services

# 4. Check status
make status
```

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `make help` | Show all available commands |
| `make setup-env` | Create .env file with sample credentials |
| `make clean` | Stop all services and clean up containers |
| `make build` | Build all microservices |
| `make start` | Start entire infrastructure and services |
| `make stop` | Stop all services |
| `make restart` | Restart all services |
| `make logs` | Show logs from all services |
| `make status` | Show status of all services |
| `make health` | Check health of all services |
| `make test-flow` | Run complete purchase flow test |
| `make clean-all` | Nuclear option: clean everything |

## 🔧 Service Configuration

### Environment Variables

The project uses a comprehensive `.env` file with the following key configurations:

```bash
# Database Configuration
POSTGRES_PASSWORD=admin
POSTGRES_DB_ORDER=orderdb
POSTGRES_DB_PRODUCT=productdb

# MongoDB Configuration  
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=admin

# Keycloak Configuration
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=admin
KEYCLOAK_REALM=ecom-app

# Service Ports
GATEWAY_PORT=8085
PRODUCT_PORT=8081
USER_PORT=8082
ORDER_PORT=8083
NOTIFICATION_PORT=8084
```

### Service Ports

| Service | Port | Description |
|---------|------|-------------|
| Config Server | 8888 | Centralized configuration |
| Eureka Server | 8761 | Service discovery |
| API Gateway | 8085 | Entry point for all requests |
| Product Service | 8081 | Product management |
| User Service | 8082 | User management |
| Order Service | 8083 | Order processing |
| Notification Service | 8084 | Event processing |
| Keycloak | 8080 | Authentication server |

## 🧪 Testing the System

### 1. Health Check

```bash
# Check all services
make health

# Individual service health
curl http://localhost:8085/actuator/health
curl http://localhost:8081/actuator/health
curl http://localhost:8082/actuator/health
curl http://localhost:8083/actuator/health
curl http://localhost:8084/actuator/health
```

### 2. Complete Purchase Flow Test

```bash
# Run automated test
make test-flow
```

### 3. Manual API Testing

```bash
# Get JWT token
TOKEN=$(curl -s -X POST "http://localhost:8080/realms/ecom-app/protocol/openid-connect/token" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d "client_id=oauth2-pkce&grant_type=password&username=alice&password=password" | jq -r .access_token)

# Create product
curl -X POST "http://localhost:8085/api/products" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","description":"Test Description","price":29.99,"stock":5}'

# Create order
curl -X POST "http://localhost:8085/api/orders" \
  -H "Authorization: Bearer $TOKEN"
```

## 🔐 Authentication & Security

### Keycloak Setup

1. **Access Keycloak Admin Console**
   - URL: http://localhost:8080
   - Username: `admin`
   - Password: `admin`

2. **Realm Configuration**
   - Realm: `ecom-app`
   - Client: `oauth2-pkce`
   - Users: `alice` (password: `password`)

3. **JWT Token Structure**
   ```json
   {
     "sub": "faed058d-7b9f-4257-a53a-904c408e11bc",
     "preferred_username": "alice",
     "email": "alice@example.com",
     "realm_access": {
       "roles": ["default-roles-ecom-app"]
     }
   }
   ```

### Security Features

- ✅ JWT-based authentication
- ✅ OAuth2 resource server
- ✅ Role-based access control
- ✅ CORS configuration
- ✅ Security headers
- ✅ Rate limiting

## 📊 Monitoring & Observability

### Service Discovery
- **Eureka Dashboard**: http://localhost:8761
- **Service Registration**: Automatic service discovery
- **Health Checks**: Built-in health monitoring

### Logging
```bash
# View all logs
make logs

# View specific service logs
tail -f logs/gateway.log
tail -f logs/order.log
tail -f logs/notification.log
```

### Metrics
- **Actuator Endpoints**: `/actuator/health`, `/actuator/metrics`
- **Prometheus**: Metrics collection enabled
- **Circuit Breaker**: Resilience4j integration

## 🗄️ Database Schema

### PostgreSQL (Order & Product Services)
```sql
-- Orders table
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_item (
    id BIGSERIAL PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    order_id BIGINT REFERENCES orders(id)
);
```

### MongoDB (User Service)
```javascript
// Users collection
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "role": String,
  "createdAt": Date
}
```

## 🔄 Event-Driven Architecture

### Kafka Topics
- **order-created**: Order creation events
- **order-updated**: Order status updates
- **user-registered**: User registration events

### Event Flow
```
Order Service → Kafka → Notification Service
     ↓              ↓           ↓
  Database    Event Store    Processing
```

## 🛠️ Development

### Project Structure
```
ecom-microservices/
├── configserver/          # Configuration server
├── eureka/               # Service discovery
├── gateway/              # API Gateway
├── product/              # Product service
├── user/                 # User service
├── order/                # Order service
├── notification/         # Notification service
├── docker-compose.yml    # Infrastructure
├── Makefile             # Build automation
└── start.sh             # Startup script
```

### Building Individual Services
```bash
# Build specific service
cd product && mvn clean package
cd user && mvn clean package
cd order && mvn clean package
```

### Running in Development Mode
```bash
# Start with live reload
make dev

# Or start individual services
cd product && mvn spring-boot:run
cd user && mvn spring-boot:run
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check port usage
   netstat -tlnp | grep :8085
   
   # Kill process on port
   sudo kill -9 $(lsof -t -i:8085)
   ```

2. **Docker Issues**
   ```bash
   # Clean up Docker
   make clean-all
   
   # Restart Docker
   sudo systemctl restart docker
   ```

3. **Service Not Starting**
   ```bash
   # Check logs
   make logs
   
   # Check service status
   make status
   ```

4. **Database Connection Issues**
   ```bash
   # Check database connectivity
   docker exec postgres-order pg_isready
   docker exec mongodb mongosh --eval "db.runCommand('ping')"
   ```

### Log Locations
- Config Server: `logs/configserver.log`
- Eureka Server: `logs/eureka.log`
- Gateway: `logs/gateway.log`
- Product Service: `logs/product.log`
- User Service: `logs/user.log`
- Order Service: `logs/order.log`
- Notification Service: `logs/notification.log`

## 📚 API Documentation

### Gateway Endpoints
- `GET /api/products` - List products
- `POST /api/products` - Create product
- `GET /api/users/{id}` - Get user
- `POST /api/users` - Create user
- `POST /api/orders` - Create order
- `GET /api/orders/{id}` - Get order

### Authentication
All endpoints require JWT token in Authorization header:
```
Authorization: Bearer <jwt-token>
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

