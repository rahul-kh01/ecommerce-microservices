#!/bin/bash

# E-commerce Microservices API Testing Script
# This script tests all available APIs across the microservices

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Service URLs
GATEWAY_URL="http://localhost:8085"
USER_SERVICE_URL="http://localhost:8082"
PRODUCT_SERVICE_URL="http://localhost:8081"
ORDER_SERVICE_URL="http://localhost:8083"
NOTIFICATION_SERVICE_URL="http://localhost:8084"

# Test data
USER_ID=""
PRODUCT_ID=""
ORDER_ID=""

echo -e "${BLUE}🚀 Starting E-commerce Microservices API Testing${NC}"
echo "=================================================="

# Function to print test results
print_result() {
    local test_name="$1"
    local status="$2"
    local response="$3"
    
    if [ "$status" = "PASS" ]; then
        echo -e "${GREEN}✅ $test_name${NC}"
    else
        echo -e "${RED}❌ $test_name${NC}"
        echo -e "${RED}Response: $response${NC}"
    fi
}

# Function to make HTTP requests
make_request() {
    local method="$1"
    local url="$2"
    local headers="$3"
    local data="$4"
    
    if [ -n "$data" ]; then
        curl -s -X "$method" "$url" $headers -d "$data" -H "Content-Type: application/json"
    else
        curl -s -X "$method" "$url" $headers
    fi
}

echo -e "\n${YELLOW}📋 Testing Service Health${NC}"
echo "=========================="

# Test service health
echo "Testing Gateway health..."
gateway_health=$(make_request "GET" "$GATEWAY_URL/actuator/health" "" "")
if [[ $gateway_health == *"UP"* ]]; then
    print_result "Gateway Health Check" "PASS" "$gateway_health"
else
    print_result "Gateway Health Check" "FAIL" "$gateway_health"
fi

echo -e "\n${YELLOW}👤 Testing User Service APIs${NC}"
echo "=============================="

# Test User Service - Get All Users
echo "Testing GET /api/users..."
users_response=$(make_request "GET" "$USER_SERVICE_URL/api/users" "" "")
if [[ $users_response == *"["* ]]; then
    print_result "GET /api/users" "PASS" "Retrieved users list"
else
    print_result "GET /api/users" "FAIL" "$users_response"
fi

# Test User Service - Create User
echo "Testing POST /api/users..."
user_data='{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890"
}'
create_user_response=$(make_request "POST" "$USER_SERVICE_URL/api/users" "" "$user_data")
if [[ $create_user_response == *"successfully"* ]]; then
    print_result "POST /api/users" "PASS" "$create_user_response"
    # Extract user ID from response or use a default
    USER_ID="1"  # We'll use this for subsequent tests
else
    print_result "POST /api/users" "FAIL" "$create_user_response"
fi

# Test User Service - Get User by ID
echo "Testing GET /api/users/{id}..."
get_user_response=$(make_request "GET" "$USER_SERVICE_URL/api/users/$USER_ID" "" "")
if [[ $get_user_response == *"name"* ]]; then
    print_result "GET /api/users/{id}" "PASS" "Retrieved user details"
else
    print_result "GET /api/users/{id}" "FAIL" "$get_user_response"
fi

# Test User Service - Update User
echo "Testing PUT /api/users/{id}..."
update_user_data='{
    "name": "Updated Test User",
    "email": "updated@example.com",
    "phone": "0987654321"
}'
update_user_response=$(make_request "PUT" "$USER_SERVICE_URL/api/users/$USER_ID" "" "$update_user_data")
if [[ $update_user_response == *"successfully"* ]]; then
    print_result "PUT /api/users/{id}" "PASS" "$update_user_response"
else
    print_result "PUT /api/users/{id}" "FAIL" "$update_user_response"
fi

echo -e "\n${YELLOW}🛍️ Testing Product Service APIs${NC}"
echo "================================="

# Test Product Service - Get All Products
echo "Testing GET /api/products..."
products_response=$(make_request "GET" "$PRODUCT_SERVICE_URL/api/products" "" "")
if [[ $products_response == *"["* ]]; then
    print_result "GET /api/products" "PASS" "Retrieved products list"
else
    print_result "GET /api/products" "FAIL" "$products_response"
fi

# Test Product Service - Create Product
echo "Testing POST /api/products..."
product_data='{
    "name": "Test Product",
    "description": "A test product for API testing",
    "price": 99.99,
    "quantity": 10
}'
create_product_response=$(make_request "POST" "$PRODUCT_SERVICE_URL/api/products" "" "$product_data")
if [[ $create_product_response == *"id"* ]]; then
    print_result "POST /api/products" "PASS" "Product created successfully"
    # Extract product ID from response
    PRODUCT_ID=$(echo $create_product_response | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    if [ -z "$PRODUCT_ID" ]; then
        PRODUCT_ID="1"  # Fallback
    fi
else
    print_result "POST /api/products" "FAIL" "$create_product_response"
fi

# Test Product Service - Get Product by ID
echo "Testing GET /api/products/{id}..."
get_product_response=$(make_request "GET" "$PRODUCT_SERVICE_URL/api/products/$PRODUCT_ID" "" "")
if [[ $get_product_response == *"name"* ]]; then
    print_result "GET /api/products/{id}" "PASS" "Retrieved product details"
else
    print_result "GET /api/products/{id}" "FAIL" "$get_product_response"
fi

# Test Product Service - Search Products
echo "Testing GET /api/products/search?keyword=test..."
search_response=$(make_request "GET" "$PRODUCT_SERVICE_URL/api/products/search?keyword=test" "" "")
if [[ $search_response == *"["* ]]; then
    print_result "GET /api/products/search" "PASS" "Product search successful"
else
    print_result "GET /api/products/search" "FAIL" "$search_response"
fi

# Test Product Service - Simulate Failure
echo "Testing GET /api/products/simulate..."
simulate_response=$(make_request "GET" "$PRODUCT_SERVICE_URL/api/products/simulate" "" "")
if [[ $simulate_response == *"OK"* ]]; then
    print_result "GET /api/products/simulate" "PASS" "$simulate_response"
else
    print_result "GET /api/products/simulate" "FAIL" "$simulate_response"
fi

# Test Product Service - Message Controller
echo "Testing GET /message (Product Service)..."
message_response=$(make_request "GET" "$PRODUCT_SERVICE_URL/message" "" "")
if [[ $message_response == *"Product Service"* ]] || [[ $message_response == *"Welcome"* ]]; then
    print_result "GET /message (Product Service)" "PASS" "$message_response"
else
    print_result "GET /message (Product Service)" "FAIL" "$message_response"
fi

echo -e "\n${YELLOW}🛒 Testing Order Service APIs${NC}"
echo "================================="

# Test Order Service - Get Cart
echo "Testing GET /api/cart..."
cart_response=$(make_request "GET" "$ORDER_SERVICE_URL/api/cart" "-H 'X-User-ID: $USER_ID'" "")
if [[ $cart_response == *"["* ]]; then
    print_result "GET /api/cart" "PASS" "Retrieved cart items"
else
    print_result "GET /api/cart" "FAIL" "$cart_response"
fi

# Test Order Service - Add to Cart
echo "Testing POST /api/cart..."
cart_item_data='{
    "productId": "'$PRODUCT_ID'",
    "quantity": 2
}'
add_to_cart_response=$(make_request "POST" "$ORDER_SERVICE_URL/api/cart" "-H 'X-User-ID: $USER_ID'" "$cart_item_data")
if [[ $add_to_cart_response == *"201"* ]] || [[ $add_to_cart_response == *"Created"* ]]; then
    print_result "POST /api/cart" "PASS" "Item added to cart"
else
    print_result "POST /api/cart" "FAIL" "$add_to_cart_response"
fi

# Test Order Service - Create Order
echo "Testing POST /api/orders..."
create_order_response=$(make_request "POST" "$ORDER_SERVICE_URL/api/orders" "-H 'X-User-ID: $USER_ID'" "")
if [[ $create_order_response == *"id"* ]]; then
    print_result "POST /api/orders" "PASS" "Order created successfully"
    # Extract order ID from response
    ORDER_ID=$(echo $create_order_response | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    if [ -z "$ORDER_ID" ]; then
        ORDER_ID="1"  # Fallback
    fi
else
    print_result "POST /api/orders" "FAIL" "$create_order_response"
fi

# Test Order Service - Get Order by ID
echo "Testing GET /api/orders/{id}..."
get_order_response=$(make_request "GET" "$ORDER_SERVICE_URL/api/orders/$ORDER_ID" "" "")
if [[ $get_order_response == *"id"* ]]; then
    print_result "GET /api/orders/{id}" "PASS" "Retrieved order details"
else
    print_result "GET /api/orders/{id}" "FAIL" "$get_order_response"
fi

# Test Order Service - Message Controller
echo "Testing GET /message (Order Service)..."
order_message_response=$(make_request "GET" "$ORDER_SERVICE_URL/message" "" "")
if [[ $order_message_response == *"Hello"* ]]; then
    print_result "GET /message (Order Service)" "PASS" "$order_message_response"
else
    print_result "GET /message (Order Service)" "FAIL" "$order_message_response"
fi

echo -e "\n${YELLOW}🌐 Testing Gateway Routing${NC}"
echo "=========================="

# Test Gateway - User Service routing
echo "Testing Gateway -> User Service..."
gateway_users_response=$(make_request "GET" "$GATEWAY_URL/api/users" "" "")
if [[ $gateway_users_response == *"["* ]]; then
    print_result "Gateway -> User Service" "PASS" "Gateway routing to User Service works"
else
    print_result "Gateway -> User Service" "FAIL" "$gateway_users_response"
fi

# Test Gateway - Product Service routing
echo "Testing Gateway -> Product Service..."
gateway_products_response=$(make_request "GET" "$GATEWAY_URL/api/products" "" "")
if [[ $gateway_products_response == *"["* ]]; then
    print_result "Gateway -> Product Service" "PASS" "Gateway routing to Product Service works"
else
    print_result "Gateway -> Product Service" "FAIL" "$gateway_products_response"
fi

# Test Gateway - Order Service routing
echo "Testing Gateway -> Order Service..."
gateway_cart_response=$(make_request "GET" "$GATEWAY_URL/api/cart" "-H 'X-User-ID: $USER_ID'" "")
if [[ $gateway_cart_response == *"["* ]]; then
    print_result "Gateway -> Order Service" "PASS" "Gateway routing to Order Service works"
else
    print_result "Gateway -> Order Service" "FAIL" "$gateway_cart_response"
fi

echo -e "\n${YELLOW}🔐 Testing Authentication Flow${NC}"
echo "================================="

# Test Keycloak health
echo "Testing Keycloak health..."
keycloak_health=$(make_request "GET" "http://localhost:8080/health" "" "")
if [[ $keycloak_health == *"UP"* ]] || [[ $keycloak_health == *"200"* ]]; then
    print_result "Keycloak Health Check" "PASS" "Keycloak is running"
else
    print_result "Keycloak Health Check" "FAIL" "$keycloak_health"
fi

# Test Eureka Server
echo "Testing Eureka Server..."
eureka_response=$(make_request "GET" "http://localhost:8761" "" "")
if [[ $eureka_response == *"Eureka"* ]] || [[ $eureka_response == *"8761"* ]]; then
    print_result "Eureka Server" "PASS" "Eureka Server is accessible"
else
    print_result "Eureka Server" "FAIL" "$eureka_response"
fi

echo -e "\n${YELLOW}📊 Testing Cross-Service Communication${NC}"
echo "=========================================="

# Test the complete flow: Create User -> Create Product -> Add to Cart -> Create Order
echo "Testing complete e-commerce flow..."

# Step 1: Create a new user
echo "Step 1: Creating user..."
flow_user_data='{
    "name": "Flow Test User",
    "email": "flow@example.com",
    "phone": "1111111111"
}'
flow_user_response=$(make_request "POST" "$USER_SERVICE_URL/api/users" "" "$flow_user_data")
if [[ $flow_user_response == *"successfully"* ]]; then
    print_result "Flow Step 1: Create User" "PASS" "User created for flow test"
    FLOW_USER_ID="2"
else
    print_result "Flow Step 1: Create User" "FAIL" "$flow_user_response"
    FLOW_USER_ID="1"  # Use existing user
fi

# Step 2: Create a new product
echo "Step 2: Creating product..."
flow_product_data='{
    "name": "Flow Test Product",
    "description": "Product for flow testing",
    "price": 49.99,
    "quantity": 5
}'
flow_product_response=$(make_request "POST" "$PRODUCT_SERVICE_URL/api/products" "" "$flow_product_data")
if [[ $flow_product_response == *"id"* ]]; then
    print_result "Flow Step 2: Create Product" "PASS" "Product created for flow test"
    FLOW_PRODUCT_ID=$(echo $flow_product_response | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    if [ -z "$FLOW_PRODUCT_ID" ]; then
        FLOW_PRODUCT_ID="2"
    fi
else
    print_result "Flow Step 2: Create Product" "FAIL" "$flow_product_response"
    FLOW_PRODUCT_ID="1"  # Use existing product
fi

# Step 3: Add product to cart
echo "Step 3: Adding product to cart..."
flow_cart_data='{
    "productId": "'$FLOW_PRODUCT_ID'",
    "quantity": 1
}'
flow_cart_response=$(make_request "POST" "$ORDER_SERVICE_URL/api/cart" "-H 'X-User-ID: $FLOW_USER_ID'" "$flow_cart_data")
if [[ $flow_cart_response == *"201"* ]] || [[ $flow_cart_response == *"Created"* ]]; then
    print_result "Flow Step 3: Add to Cart" "PASS" "Product added to cart"
else
    print_result "Flow Step 3: Add to Cart" "FAIL" "$flow_cart_response"
fi

# Step 4: Create order
echo "Step 4: Creating order..."
flow_order_response=$(make_request "POST" "$ORDER_SERVICE_URL/api/orders" "-H 'X-User-ID: $FLOW_USER_ID'" "")
if [[ $flow_order_response == *"id"* ]]; then
    print_result "Flow Step 4: Create Order" "PASS" "Order created successfully"
    print_result "Complete E-commerce Flow" "PASS" "End-to-end flow completed successfully"
else
    print_result "Flow Step 4: Create Order" "FAIL" "$flow_order_response"
    print_result "Complete E-commerce Flow" "FAIL" "Flow interrupted at order creation"
fi

echo -e "\n${BLUE}🎉 API Testing Complete!${NC}"
echo "=========================="
echo -e "${GREEN}All API endpoints have been tested across the microservices architecture.${NC}"
echo -e "${YELLOW}Check the results above for any failed tests.${NC}"
echo ""
echo "Service URLs tested:"
echo "  - User Service: $USER_SERVICE_URL"
echo "  - Product Service: $PRODUCT_SERVICE_URL"
echo "  - Order Service: $ORDER_SERVICE_URL"
echo "  - Gateway: $GATEWAY_URL"
echo "  - Keycloak: http://localhost:8080"
echo "  - Eureka: http://localhost:8761"
