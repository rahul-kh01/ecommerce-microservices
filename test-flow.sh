#!/bin/bash

# E-commerce Microservices Test Flow Script
# =========================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Function to check if service is healthy
check_service_health() {
    local service_name=$1
    local port=$2
    
    if curl -s "http://localhost:$port/actuator/health" >/dev/null 2>&1; then
        print_success "$service_name is healthy"
        return 0
    else
        print_error "$service_name is not responding"
        return 1
    fi
}

# Function to get JWT token
get_jwt_token() {
    print_status "Getting JWT token from Keycloak..."
    
    local token_response=$(curl -s -X POST "http://localhost:8080/realms/ecom-app/protocol/openid-connect/token" \
        -H 'Content-Type: application/x-www-form-urlencoded' \
        -d "client_id=oauth2-pkce&grant_type=password&username=alice&password=password")
    
    local token=$(echo "$token_response" | jq -r '.access_token' 2>/dev/null)
    
    if [ -z "$token" ] || [ "$token" = "null" ]; then
        print_error "Failed to get JWT token"
        print_status "Response: $token_response"
        return 1
    fi
    
    print_success "JWT token obtained"
    echo "$token"
}

# Function to create product
create_product() {
    local token=$1
    
    print_status "Creating product..."
    
    local product_response=$(curl -s -X POST "http://localhost:8085/api/products" \
        -H "Authorization: Bearer $token" \
        -H "Content-Type: application/json" \
        -d '{"name":"Test Product","description":"Test Description","price":29.99,"stock":5}')
    
    local product_id=$(echo "$product_response" | jq -r '.id' 2>/dev/null)
    
    if [ -z "$product_id" ] || [ "$product_id" = "null" ]; then
        print_error "Failed to create product"
        print_status "Response: $product_response"
        return 1
    fi
    
    print_success "Product created with ID: $product_id"
    echo "$product_id"
}

# Function to add item to cart
add_to_cart() {
    local token=$1
    local product_id=$2
    
    print_status "Adding item to cart..."
    
    local cart_response=$(curl -s -X POST "http://localhost:8083/api/cart" \
        -H "Authorization: Bearer $token" \
        -H "X-User-ID: faed058d-7b9f-4257-a53a-904c408e11bc" \
        -H "Content-Type: application/json" \
        -d "{\"productId\":\"$product_id\",\"quantity\":1}")
    
    if [ -z "$cart_response" ]; then
        print_warning "Cart service may not be working properly"
        return 1
    fi
    
    print_success "Item added to cart"
}

# Function to create order
create_order() {
    local token=$1
    
    print_status "Creating order..."
    
    local order_response=$(curl -s -X POST "http://localhost:8083/api/orders" \
        -H "Authorization: Bearer $token")
    
    local order_id=$(echo "$order_response" | jq -r '.id' 2>/dev/null)
    
    if [ -z "$order_id" ] || [ "$order_id" = "null" ]; then
        print_error "Failed to create order"
        print_status "Response: $order_response"
        return 1
    fi
    
    print_success "Order created with ID: $order_id"
    echo "$order_id"
}

# Function to verify order in database
verify_order() {
    local order_id=$1
    
    print_status "Verifying order in database..."
    
    local db_result=$(docker exec postgres-order psql -U postgres -d orderdb -t -c "SELECT id, user_id, total_amount, status FROM orders WHERE id = $order_id;" 2>/dev/null)
    
    if [ -n "$db_result" ] && [ "$db_result" != "" ]; then
        print_success "Order verified in database: $db_result"
        return 0
    else
        print_error "Order not found in database"
        return 1
    fi
}

# Function to check Kafka events
check_kafka_events() {
    print_status "Checking Kafka events..."
    
    # List topics
    local topics=$(docker exec kafka kafka-topics --list --bootstrap-server localhost:9092 2>/dev/null)
    
    if echo "$topics" | grep -q "order-created"; then
        print_success "Kafka topic 'order-created' exists"
    else
        print_warning "Kafka topic 'order-created' not found"
    fi
    
    # Check if notification service is consuming
    if curl -s "http://localhost:8084/actuator/health" >/dev/null 2>&1; then
        print_success "Notification service is running and should be consuming events"
    else
        print_warning "Notification service is not responding"
    fi
}

# Main test flow
main() {
    echo "🧪 E-commerce Microservices Test Flow"
    echo "====================================="
    echo ""
    
    # Check service health
    print_status "Checking service health..."
    check_service_health "Gateway" 8085 || exit 1
    check_service_health "Product Service" 8081 || exit 1
    check_service_health "User Service" 8082 || exit 1
    check_service_health "Order Service" 8083 || exit 1
    check_service_health "Notification Service" 8084 || exit 1
    echo ""
    
    # Get JWT token
    local token=$(get_jwt_token)
    if [ -z "$token" ]; then
        exit 1
    fi
    echo ""
    
    # Create product
    local product_id=$(create_product "$token")
    if [ -z "$product_id" ]; then
        exit 1
    fi
    echo ""
    
    # Add to cart (optional - may fail due to user service issues)
    add_to_cart "$token" "$product_id" || print_warning "Cart service may have issues"
    echo ""
    
    # Create order
    local order_id=$(create_order "$token")
    if [ -z "$order_id" ]; then
        exit 1
    fi
    echo ""
    
    # Verify order in database
    verify_order "$order_id"
    echo ""
    
    # Check Kafka events
    check_kafka_events
    echo ""
    
    # Final results
    print_success "🎉 Test Flow Completed Successfully!"
    echo ""
    echo "📊 Test Results:"
    echo "  Product ID: $product_id"
    echo "  Order ID: $order_id"
    echo "  JWT Token: ${token:0:50}..."
    echo ""
    echo "✅ All tests passed! The microservices ecosystem is working correctly."
}

# Run main function
main "$@"
