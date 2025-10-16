#!/bin/bash

cd ../..

# Build all services
cd eureka && ./mvnw clean compile jib:build && cd ..
cd gateway && ./mvnw clean compile jib:build && cd ..
cd configserver && ./mvnw clean compile jib:build && cd ..
cd order && ./mvnw clean compile jib:build && cd ..
cd user && ./mvnw clean compile jib:build && cd ..
cd product && ./mvnw clean compile jib:build && cd ..
cd notification && ./mvnw clean compile jib:build && cd ..
