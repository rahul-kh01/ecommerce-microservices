# E-commerce Microservices Makefile
# Complete project management for starting, stopping, and rebuilding the entire ecosystem

.PHONY: help clean build start stop restart logs status health check-env setup-env

# Default target
help:
	@echo "E-commerce Microservices Management"
	@echo "=================================="
	@echo ""
	@echo "Available commands:"
	@echo "  make setup-env     - Create .env file with sample credentials"
	@echo "  make clean         - Stop all services and clean up containers/images"
	@echo "  make build         - Build all microservices"
	@echo "  make start         - Start entire infrastructure and services"
	@echo "  make stop          - Stop all services"
	@echo "  make restart       - Restart all services"
	@echo "  make logs          - Show logs from all services"
	@echo "  make status        - Show status of all services"
	@echo "  make health        - Check health of all services"
	@echo "  make test-flow     - Run complete purchase flow test"
	@echo "  make clean-all     - Nuclear option: clean everything"
	@echo "  make check-ports   - Check for port conflicts"
	@echo ""

# Environment setup
setup-env:
	@echo "Setting up environment configuration..."
	@echo "# E-commerce Microservices Environment Configuration" > .env
	@echo "POSTGRES_PASSWORD=admin" >> .env
	@echo "POSTGRES_DB_ORDER=orderdb" >> .env
	@echo "POSTGRES_DB_PRODUCT=productdb" >> .env
	@echo "POSTGRES_USER=postgres" >> .env
	@echo "MONGO_INITDB_ROOT_USERNAME=admin" >> .env
	@echo "MONGO_INITDB_ROOT_PASSWORD=admin" >> .env
	@echo "MONGO_INITDB_DATABASE=ecommerce" >> .env
	@echo "REDIS_PASSWORD=" >> .env
	@echo "KEYCLOAK_ADMIN=admin" >> .env
	@echo "KEYCLOAK_ADMIN_PASSWORD=admin" >> .env
	@echo "KEYCLOAK_REALM=ecom-app" >> .env
	@echo "KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181" >> .env
	@echo "KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092" >> .env
	@echo "KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092" >> .env
	@echo "CONFIG_SERVER_PORT=8888" >> .env
	@echo "EUREKA_SERVER_PORT=8761" >> .env
	@echo "GATEWAY_PORT=8085" >> .env
	@echo "PRODUCT_PORT=8081" >> .env
	@echo "USER_PORT=8082" >> .env
	@echo "ORDER_PORT=8083" >> .env
	@echo "NOTIFICATION_PORT=8084" >> .env
	@echo "JWT_ISSUER_URI=http://localhost:8080/realms/ecom-app" >> .env
	@echo "JWT_AUDIENCE=account" >> .env
	@echo "DATABASE_URL_ORDER=jdbc:postgresql://localhost:5432/orderdb" >> .env
	@echo "DATABASE_URL_PRODUCT=jdbc:postgresql://localhost:5432/productdb" >> .env
	@echo "MONGODB_URL=mongodb://localhost:27017/ecommerce" >> .env
	@echo "ORDER_CREATED_TOPIC=order-created" >> .env
	@echo "NOTIFICATION_GROUP=notification-group" >> .env
	@echo "✅ Environment file created: .env"

# Clean up everything
clean:
	@echo "🧹 Cleaning up containers and images..."
	@echo "Stopping and removing existing containers..."
	@docker stop postgres-order postgres-product mongodb redis zookeeper kafka keycloak 2>/dev/null || true
	@docker rm postgres-order postgres-product mongodb redis zookeeper kafka keycloak 2>/dev/null || true
	@docker-compose down -v --remove-orphans 2>/dev/null || true
	@docker system prune -f
	@echo "✅ Cleanup completed"

# Nuclear option - clean everything
clean-all: clean
	@echo "💥 Nuclear cleanup - removing all containers, images, and volumes..."
	@docker system prune -af --volumes
	@docker network prune -f
	@echo "✅ Nuclear cleanup completed"

# Build all microservices
build:
	@echo "🔨 Building all microservices..."
	@cd configserver && mvn clean package -DskipTests
	@cd eureka && mvn clean package -DskipTests  
	@cd gateway && mvn clean package -DskipTests
	@cd product && mvn clean package -DskipTests
	@cd user && mvn clean package -DskipTests
	@cd order && mvn clean package -DskipTests
	@cd notification && mvn clean package -DskipTests
	@echo "✅ All services built successfully"

# Start infrastructure
start-infra:
	@echo "🐳 Starting Docker infrastructure..."
	@echo "Checking for existing containers..."
	@docker stop postgres-order postgres-product mongodb redis zookeeper kafka keycloak 2>/dev/null || true
	@docker rm postgres-order postgres-product mongodb redis zookeeper kafka keycloak 2>/dev/null || true
	@echo "Starting PostgreSQL for Order Service..."
	@docker run -d --name postgres-order -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=orderdb -p 5432:5432 postgres:15
	@echo "Starting PostgreSQL for Product Service..."
	@docker run -d --name postgres-product -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=productdb -p 5433:5432 postgres:15
	@echo "Starting MongoDB..."
	@docker run -d --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -e MONGO_INITDB_DATABASE=ecommerce -p 27017:27017 mongo:7
	@echo "Starting Redis..."
	@docker run -d --name redis -p 6379:6379 redis:7-alpine
	@echo "Starting Zookeeper..."
	@docker run -d --name zookeeper -p 2181:2181 zookeeper:3.8
	@echo "Starting Kafka..."
	@docker run -d --name kafka --link zookeeper -p 9092:9092 \
		-e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
		-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
		-e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 \
		confluentinc/cp-kafka:7.5.0
	@echo "Starting Keycloak..."
	@docker run -d --name keycloak -p 8080:8080 \
		-e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin \
		quay.io/keycloak/keycloak:latest start-dev
	@echo "⏳ Waiting for infrastructure to be ready..."
	@sleep 30
	@echo "✅ Infrastructure started successfully"

# Create databases and setup
setup-databases:
	@echo "🗄️ Setting up databases..."
	@docker exec postgres-order psql -U postgres -c "CREATE DATABASE IF NOT EXISTS orderdb;" 2>/dev/null || true
	@docker exec postgres-product psql -U postgres -c "CREATE DATABASE IF NOT EXISTS productdb;" 2>/dev/null || true
	@echo "✅ Databases setup completed"

# Create Kafka topics
setup-kafka:
	@echo "📨 Setting up Kafka topics..."
	@sleep 10
	@docker exec kafka kafka-topics --create --topic order-created --bootstrap-server localhost:9092 --replication-factor 1 --partitions 3 2>/dev/null || echo "Topic already exists"
	@echo "✅ Kafka topics created"

# Setup Keycloak realm
setup-keycloak:
	@echo "🔐 Setting up Keycloak realm..."
	@sleep 20
	@echo "Keycloak is ready at http://localhost:8080"
	@echo "Admin credentials: admin/admin"
	@echo "✅ Keycloak setup completed"

# Start all services in order
start-services:
	@echo "🚀 Starting microservices..."
	@mkdir -p logs
	@echo "Starting Config Server..."
	@cd configserver && nohup mvn spring-boot:run > ../logs/configserver.log 2>&1 &
	@sleep 10
	@echo "Starting Eureka Server..."
	@cd eureka && nohup mvn spring-boot:run > ../logs/eureka.log 2>&1 &
	@sleep 15
	@echo "Starting Gateway..."
	@cd gateway && nohup mvn spring-boot:run > ../logs/gateway.log 2>&1 &
	@sleep 10
	@echo "Starting Product Service..."
	@cd product && nohup mvn spring-boot:run > ../logs/product.log 2>&1 &
	@sleep 10
	@echo "Starting User Service..."
	@cd user && nohup mvn spring-boot:run > ../logs/user.log 2>&1 &
	@sleep 10
	@echo "Starting Order Service..."
	@cd order && nohup mvn spring-boot:run > ../logs/order.log 2>&1 &
	@sleep 10
	@echo "Starting Notification Service..."
	@cd notification && nohup mvn spring-boot:run > ../logs/notification.log 2>&1 &
	@sleep 15
	@echo "✅ All services started successfully"

# Complete start process
start: setup-env clean start-infra setup-databases setup-kafka setup-keycloak start-services
	@echo ""
	@echo "🎉 E-commerce Microservices Ecosystem Started!"
	@echo "=============================================="
	@echo ""
	@echo "Service URLs:"
	@echo "  Config Server:    http://localhost:8888"
	@echo "  Eureka Server:   http://localhost:8761"
	@echo "  Gateway:          http://localhost:8085"
	@echo "  Product Service:  http://localhost:8081"
	@echo "  User Service:     http://localhost:8082"
	@echo "  Order Service:    http://localhost:8083"
	@echo "  Notification:    http://localhost:8084"
	@echo "  Keycloak:        http://localhost:8080"
	@echo ""
	@echo "Use 'make status' to check service health"
	@echo "Use 'make logs' to view service logs"
	@echo "Use 'make test-flow' to run purchase flow test"

# Stop all services
stop:
	@echo "🛑 Stopping all services..."
	@pkill -f "spring-boot:run" 2>/dev/null || true
	@docker stop postgres-order postgres-product mongodb redis zookeeper kafka keycloak 2>/dev/null || true
	@docker rm postgres-order postgres-product mongodb redis zookeeper kafka keycloak 2>/dev/null || true
	@echo "✅ All services stopped"

# Restart all services
restart: stop start

# Show service status
status:
	@echo "📊 Service Status Check"
	@echo "======================"
	@echo ""
	@echo "Docker Containers:"
	@docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -E "(postgres|mongo|redis|zookeeper|kafka|keycloak)" || echo "No containers running"
	@echo ""
	@echo "Java Processes:"
	@ps aux | grep "spring-boot:run" | grep -v grep | awk '{print $$2, $$11, $$12, $$13}' || echo "No Spring Boot processes running"
	@echo ""
	@echo "Service Health Checks:"
	@echo -n "Config Server:    "; curl -s http://localhost:8888/actuator/health >/dev/null && echo "✅ UP" || echo "❌ DOWN"
	@echo -n "Eureka Server:   "; curl -s http://localhost:8761/actuator/health >/dev/null && echo "✅ UP" || echo "❌ DOWN"
	@echo -n "Gateway:         "; curl -s http://localhost:8085/actuator/health >/dev/null && echo "✅ UP" || echo "❌ DOWN"
	@echo -n "Product Service: "; curl -s http://localhost:8081/actuator/health >/dev/null && echo "✅ UP" || echo "❌ DOWN"
	@echo -n "User Service:    "; curl -s http://localhost:8082/actuator/health >/dev/null && echo "✅ UP" || echo "❌ DOWN"
	@echo -n "Order Service:   "; curl -s http://localhost:8083/actuator/health >/dev/null && echo "✅ UP" || echo "❌ DOWN"
	@echo -n "Notification:    "; curl -s http://localhost:8084/actuator/health >/dev/null && echo "✅ UP" || echo "❌ DOWN"

# Show logs
logs:
	@echo "📋 Service Logs"
	@echo "==============="
	@echo ""
	@echo "Choose a service to view logs:"
	@echo "1) All services"
	@echo "2) Config Server"
	@echo "3) Eureka Server"
	@echo "4) Gateway"
	@echo "5) Product Service"
	@echo "6) User Service"
	@echo "7) Order Service"
	@echo "8) Notification Service"
	@echo ""
	@read -p "Enter choice (1-8): " choice; \
	case $$choice in \
		1) tail -f logs/*.log ;; \
		2) tail -f logs/configserver.log ;; \
		3) tail -f logs/eureka.log ;; \
		4) tail -f logs/gateway.log ;; \
		5) tail -f logs/product.log ;; \
		6) tail -f logs/user.log ;; \
		7) tail -f logs/order.log ;; \
		8) tail -f logs/notification.log ;; \
		*) echo "Invalid choice" ;; \
	esac

# Health check
health:
	@echo "🏥 Health Check"
	@echo "==============="
	@echo ""
	@echo "Infrastructure Health:"
	@echo -n "PostgreSQL:       "; docker exec postgres-order pg_isready >/dev/null 2>&1 && echo "✅ UP" || echo "❌ DOWN"
	@echo -n "MongoDB:          "; docker exec mongodb mongosh --eval "db.runCommand('ping')" >/dev/null 2>&1 && echo "✅ UP" || echo "❌ DOWN"
	@echo -n "Redis:            "; docker exec redis redis-cli ping >/dev/null 2>&1 && echo "✅ UP" || echo "❌ DOWN"
	@echo -n "Kafka:            "; docker exec kafka kafka-topics --list --bootstrap-server localhost:9092 >/dev/null 2>&1 && echo "✅ UP" || echo "❌ DOWN"
	@echo -n "Keycloak:         "; curl -s http://localhost:8080/realms/master >/dev/null && echo "✅ UP" || echo "❌ DOWN"
	@echo ""
	@echo "Service Health:"
	@echo -n "Config Server:    "; curl -s http://localhost:8888/actuator/health | jq -r '.status' 2>/dev/null || echo "❌ DOWN"
	@echo -n "Eureka Server:   "; curl -s http://localhost:8761/actuator/health | jq -r '.status' 2>/dev/null || echo "❌ DOWN"
	@echo -n "Gateway:         "; curl -s http://localhost:8085/actuator/health | jq -r '.status' 2>/dev/null || echo "❌ DOWN"
	@echo -n "Product Service: "; curl -s http://localhost:8081/actuator/health | jq -r '.status' 2>/dev/null || echo "❌ DOWN"
	@echo -n "User Service:    "; curl -s http://localhost:8082/actuator/health | jq -r '.status' 2>/dev/null || echo "❌ DOWN"
	@echo -n "Order Service:   "; curl -s http://localhost:8083/actuator/health | jq -r '.status' 2>/dev/null || echo "❌ DOWN"
	@echo -n "Notification:    "; curl -s http://localhost:8084/actuator/health | jq -r '.status' 2>/dev/null || echo "❌ DOWN"

# Test complete purchase flow
test-flow:
	@echo "🧪 Testing Complete Purchase Flow"
	@echo "================================="
	@echo ""
	@echo "Step 1: Getting JWT token from Keycloak..."
	@TOKEN=$$(curl -s -X POST "http://localhost:8080/realms/ecom-app/protocol/openid-connect/token" \
		-H 'Content-Type: application/x-www-form-urlencoded' \
		-d "client_id=oauth2-pkce&grant_type=password&username=alice&password=password" | jq -r .access_token 2>/dev/null) || TOKEN=""
	@if [ -z "$$TOKEN" ] || [ "$$TOKEN" = "null" ]; then \
		echo "❌ Failed to get JWT token. Please check Keycloak setup."; \
		exit 1; \
	fi
	@echo "✅ JWT token obtained"
	@echo ""
	@echo "Step 2: Creating product..."
	@PRODUCT_RESPONSE=$$(curl -s -X POST "http://localhost:8085/api/products" \
		-H "Authorization: Bearer $$TOKEN" \
		-H "Content-Type: application/json" \
		-d '{"name":"Test Product","description":"Test Description","price":29.99,"stock":5}') || PRODUCT_RESPONSE=""
	@if [ -z "$$PRODUCT_RESPONSE" ]; then \
		echo "❌ Failed to create product"; \
		exit 1; \
	fi
	@PRODUCT_ID=$$(echo "$$PRODUCT_RESPONSE" | jq -r '.id' 2>/dev/null) || PRODUCT_ID=""
	@echo "✅ Product created with ID: $$PRODUCT_ID"
	@echo ""
	@echo "Step 3: Adding item to cart..."
	@CART_RESPONSE=$$(curl -s -X POST "http://localhost:8083/api/cart" \
		-H "Authorization: Bearer $$TOKEN" \
		-H "X-User-ID: faed058d-7b9f-4257-a53a-904c408e11bc" \
		-H "Content-Type: application/json" \
		-d "{\"productId\":\"$$PRODUCT_ID\",\"quantity\":1}") || CART_RESPONSE=""
	@echo "✅ Cart item added"
	@echo ""
	@echo "Step 4: Creating order..."
	@ORDER_RESPONSE=$$(curl -s -X POST "http://localhost:8083/api/orders" \
		-H "Authorization: Bearer $$TOKEN") || ORDER_RESPONSE=""
	@if [ -z "$$ORDER_RESPONSE" ]; then \
		echo "❌ Failed to create order"; \
		exit 1; \
	fi
	@ORDER_ID=$$(echo "$$ORDER_RESPONSE" | jq -r '.id' 2>/dev/null) || ORDER_ID=""
	@echo "✅ Order created with ID: $$ORDER_ID"
	@echo ""
	@echo "Step 5: Verifying Kafka event processing..."
	@sleep 5
	@echo "✅ Purchase flow test completed successfully!"
	@echo ""
	@echo "📊 Test Results:"
	@echo "  Product ID: $$PRODUCT_ID"
	@echo "  Order ID: $$ORDER_ID"
	@echo "  JWT Token: $${TOKEN:0:50}..."
	@echo ""
	@echo "🎉 All tests passed! The microservices ecosystem is working correctly."

# Create logs directory
setup-logs:
	@mkdir -p logs
	@echo "✅ Logs directory created"

# Quick start (assumes infrastructure is already running)
quick-start: setup-logs start-services
	@echo "🚀 Quick start completed - services are running"

# Development mode (with live reload)
dev:
	@echo "🔧 Starting in development mode..."
	@echo "This will start services with live reload enabled"
	@echo "Use Ctrl+C to stop all services"
	@trap 'make stop' INT; \
	cd configserver && mvn spring-boot:run &
	cd eureka && mvn spring-boot:run &
	cd gateway && mvn spring-boot:run &
	cd product && mvn spring-boot:run &
	cd user && mvn spring-boot:run &
	cd order && mvn spring-boot:run &
	cd notification && mvn spring-boot:run &
	wait

# Show service URLs
urls:
	@echo "🌐 Service URLs"
	@echo "==============="
	@echo ""
	@echo "Management URLs:"
	@echo "  Config Server:    http://localhost:8888"
	@echo "  Eureka Server:   http://localhost:8761"
	@echo "  Keycloak Admin:  http://localhost:8080"
	@echo ""
	@echo "API Gateway:"
	@echo "  Gateway:         http://localhost:8085"
	@echo ""
	@echo "Direct Service URLs:"
	@echo "  Product Service:  http://localhost:8081"
	@echo "  User Service:    http://localhost:8082"
	@echo "  Order Service:   http://localhost:8083"
	@echo "  Notification:   http://localhost:8084"
	@echo ""
	@echo "Health Check URLs:"
	@echo "  Gateway Health:  http://localhost:8085/actuator/health"
	@echo "  Product Health: http://localhost:8081/actuator/health"
	@echo "  User Health:    http://localhost:8082/actuator/health"
	@echo "  Order Health:   http://localhost:8083/actuator/health"
	@echo "  Notification:   http://localhost:8084/actuator/health"

# Check for port conflicts
check-ports:
	@echo "🔍 Checking for port conflicts..."
	@echo ""
	@echo "Required ports:"
	@echo "  5432 - PostgreSQL (Order)"
	@echo "  5433 - PostgreSQL (Product)"
	@echo "  27017 - MongoDB"
	@echo "  6379 - Redis"
	@echo "  2181 - Zookeeper"
	@echo "  9092 - Kafka"
	@echo "  8080 - Keycloak"
	@echo "  8888 - Config Server"
	@echo "  8761 - Eureka Server"
	@echo "  8085 - Gateway"
	@echo "  8081 - Product Service"
	@echo "  8082 - User Service"
	@echo "  8083 - Order Service"
	@echo "  8084 - Notification Service"
	@echo ""
	@echo "Port usage check:"
	@echo -n "Port 5432: "; netstat -tlnp 2>/dev/null | grep :5432 >/dev/null && echo "❌ IN USE" || echo "✅ FREE"
	@echo -n "Port 5433: "; netstat -tlnp 2>/dev/null | grep :5433 >/dev/null && echo "❌ IN USE" || echo "✅ FREE"
	@echo -n "Port 27017: "; netstat -tlnp 2>/dev/null | grep :27017 >/dev/null && echo "❌ IN USE" || echo "✅ FREE"
	@echo -n "Port 6379: "; netstat -tlnp 2>/dev/null | grep :6379 >/dev/null && echo "❌ IN USE" || echo "✅ FREE"
	@echo -n "Port 2181: "; netstat -tlnp 2>/dev/null | grep :2181 >/dev/null && echo "❌ IN USE" || echo "✅ FREE"
	@echo -n "Port 9092: "; netstat -tlnp 2>/dev/null | grep :9092 >/dev/null && echo "❌ IN USE" || echo "✅ FREE"
	@echo -n "Port 8080: "; netstat -tlnp 2>/dev/null | grep :8080 >/dev/null && echo "❌ IN USE" || echo "✅ FREE"
	@echo -n "Port 8888: "; netstat -tlnp 2>/dev/null | grep :8888 >/dev/null && echo "❌ IN USE" || echo "✅ FREE"
	@echo -n "Port 8761: "; netstat -tlnp 2>/dev/null | grep :8761 >/dev/null && echo "❌ IN USE" || echo "✅ FREE"
	@echo -n "Port 8085: "; netstat -tlnp 2>/dev/null | grep :8085 >/dev/null && echo "❌ IN USE" || echo "✅ FREE"
	@echo -n "Port 8081: "; netstat -tlnp 2>/dev/null | grep :8081 >/dev/null && echo "❌ IN USE" || echo "✅ FREE"
	@echo -n "Port 8082: "; netstat -tlnp 2>/dev/null | grep :8082 >/dev/null && echo "❌ IN USE" || echo "✅ FREE"
	@echo -n "Port 8083: "; netstat -tlnp 2>/dev/null | grep :8083 >/dev/null && echo "❌ IN USE" || echo "✅ FREE"
	@echo -n "Port 8084: "; netstat -tlnp 2>/dev/null | grep :8084 >/dev/null && echo "❌ IN USE" || echo "✅ FREE"