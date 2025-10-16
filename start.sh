#!/bin/bash

# E-commerce Microservices Startup Script
# =======================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if a service is running
check_service() {
    local service_name=$1
    local port=$2
    local max_attempts=30
    local attempt=1

    print_status "Checking $service_name on port $port..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s "http://localhost:$port/actuator/health" >/dev/null 2>&1; then
            print_success "$service_name is running and healthy"
            return 0
        fi
        
        if [ $attempt -eq $max_attempts ]; then
            print_error "$service_name failed to start after $max_attempts attempts"
            return 1
        fi
        
        print_status "Waiting for $service_name... (attempt $attempt/$max_attempts)"
        sleep 5
        ((attempt++))
    done
}

# Function to wait for infrastructure
wait_for_infrastructure() {
    print_status "Waiting for infrastructure to be ready..."
    
    # Wait for PostgreSQL
    print_status "Waiting for PostgreSQL..."
    while ! docker exec postgres-order pg_isready >/dev/null 2>&1; do
        sleep 2
    done
    print_success "PostgreSQL is ready"
    
    # Wait for MongoDB
    print_status "Waiting for MongoDB..."
    while ! docker exec mongodb mongosh --eval "db.runCommand('ping')" >/dev/null 2>&1; do
        sleep 2
    done
    print_success "MongoDB is ready"
    
    # Wait for Redis
    print_status "Waiting for Redis..."
    while ! docker exec redis redis-cli ping >/dev/null 2>&1; do
        sleep 2
    done
    print_success "Redis is ready"
    
    # Wait for Kafka
    print_status "Waiting for Kafka..."
    while ! docker exec kafka kafka-topics --list --bootstrap-server localhost:9092 >/dev/null 2>&1; do
        sleep 2
    done
    print_success "Kafka is ready"
    
    # Wait for Keycloak
    print_status "Waiting for Keycloak..."
    while ! curl -s http://localhost:8080/realms/master >/dev/null 2>&1; do
        sleep 2
    done
    print_success "Keycloak is ready"
}

# Function to setup databases
setup_databases() {
    print_status "Setting up databases..."
    
    # Create order database
    docker exec postgres-order psql -U postgres -c "CREATE DATABASE IF NOT EXISTS orderdb;" 2>/dev/null || true
    
    # Create product database  
    docker exec postgres-product psql -U postgres -c "CREATE DATABASE IF NOT EXISTS productdb;" 2>/dev/null || true
    
    print_success "Databases setup completed"
}

# Function to setup Kafka topics
setup_kafka() {
    print_status "Setting up Kafka topics..."
    
    # Create order-created topic
    docker exec kafka kafka-topics --create --topic order-created --bootstrap-server localhost:9092 --replication-factor 1 --partitions 3 2>/dev/null || echo "Topic already exists"
    
    print_success "Kafka topics created"
}

# Function to setup Keycloak
setup_keycloak() {
    print_status "Setting up Keycloak realm..."
    
    # Wait a bit more for Keycloak to be fully ready
    sleep 10
    
    print_success "Keycloak is ready at http://localhost:8080"
    print_status "Admin credentials: admin/admin"
    print_status "Realm: ecom-app"
}

# Function to start microservices
start_services() {
    print_status "Starting microservices..."
    
    # Create logs directory
    mkdir -p logs
    
    # Start Config Server
    print_status "Starting Config Server..."
    cd configserver
    nohup mvn spring-boot:run > ../logs/configserver.log 2>&1 &
    CONFIG_PID=$!
    cd ..
    sleep 10
    
    # Start Eureka Server
    print_status "Starting Eureka Server..."
    cd eureka
    nohup mvn spring-boot:run > ../logs/eureka.log 2>&1 &
    EUREKA_PID=$!
    cd ..
    sleep 15
    
    # Start Gateway
    print_status "Starting Gateway..."
    cd gateway
    nohup mvn spring-boot:run > ../logs/gateway.log 2>&1 &
    GATEWAY_PID=$!
    cd ..
    sleep 10
    
    # Start Product Service
    print_status "Starting Product Service..."
    cd product
    nohup mvn spring-boot:run > ../logs/product.log 2>&1 &
    PRODUCT_PID=$!
    cd ..
    sleep 10
    
    # Start User Service
    print_status "Starting User Service..."
    cd user
    nohup mvn spring-boot:run > ../logs/user.log 2>&1 &
    USER_PID=$!
    cd ..
    sleep 10
    
    # Start Order Service
    print_status "Starting Order Service..."
    cd order
    nohup mvn spring-boot:run > ../logs/order.log 2>&1 &
    ORDER_PID=$!
    cd ..
    sleep 10
    
    # Start Notification Service
    print_status "Starting Notification Service..."
    cd notification
    nohup mvn spring-boot:run > ../logs/notification.log 2>&1 &
    NOTIFICATION_PID=$!
    cd ..
    sleep 15
    
    print_success "All services started successfully"
}

# Function to verify services
verify_services() {
    print_status "Verifying services..."
    
    # Check Config Server
    check_service "Config Server" 8888
    
    # Check Eureka Server
    check_service "Eureka Server" 8761
    
    # Check Gateway
    check_service "Gateway" 8085
    
    # Check Product Service
    check_service "Product Service" 8081
    
    # Check User Service
    check_service "User Service" 8082
    
    # Check Order Service
    check_service "Order Service" 8083
    
    # Check Notification Service
    check_service "Notification Service" 8084
    
    print_success "All services are running and healthy"
}

# Function to display service URLs
show_urls() {
    echo ""
    print_success "🎉 E-commerce Microservices Ecosystem Started!"
    echo "=============================================="
    echo ""
    echo "Service URLs:"
    echo "  Config Server:    http://localhost:8888"
    echo "  Eureka Server:   http://localhost:8761"
    echo "  Gateway:          http://localhost:8085"
    echo "  Product Service:  http://localhost:8081"
    echo "  User Service:     http://localhost:8082"
    echo "  Order Service:    http://localhost:8083"
    echo "  Notification:    http://localhost:8084"
    echo "  Keycloak:        http://localhost:8080"
    echo ""
    echo "Health Check URLs:"
    echo "  Gateway Health:  http://localhost:8085/actuator/health"
    echo "  Product Health: http://localhost:8081/actuator/health"
    echo "  User Health:    http://localhost:8082/actuator/health"
    echo "  Order Health:   http://localhost:8083/actuator/health"
    echo "  Notification:   http://localhost:8084/actuator/health"
    echo ""
    echo "Management URLs:"
    echo "  Eureka Dashboard: http://localhost:8761"
    echo "  Keycloak Admin:   http://localhost:8080"
    echo ""
    echo "Use 'make status' to check service health"
    echo "Use 'make logs' to view service logs"
    echo "Use 'make test-flow' to run purchase flow test"
}

# Main execution
main() {
    echo "🚀 Starting E-commerce Microservices Ecosystem"
    echo "=============================================="
    echo ""
    
    # Check if Docker is running
    if ! docker info >/dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
    
    # Start infrastructure
    print_status "Starting Docker infrastructure..."
    docker-compose up -d
    
    # Wait for infrastructure
    wait_for_infrastructure
    
    # Setup databases
    setup_databases
    
    # Setup Kafka
    setup_kafka
    
    # Setup Keycloak
    setup_keycloak
    
    # Start services
    start_services
    
    # Verify services
    verify_services
    
    # Show URLs
    show_urls
}

# Run main function
main "$@"
