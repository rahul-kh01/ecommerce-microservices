#!/bin/bash

cd ../..

# Build all services
cd eureka && ./mvnw spring-boot:build-image -DskipTests && cd ..
cd gateway && ./mvnw spring-boot:build-image -DskipTests && cd ..
cd configserver && ./mvnw spring-boot:build-image -DskipTests && cd ..
cd order && ./mvnw spring-boot:build-image -DskipTests && cd ..
cd user && ./mvnw spring-boot:build-image -DskipTests && cd ..
cd product && ./mvnw spring-boot:build-image -DskipTests && cd ..
cd notification && ./mvnw spring-boot:build-image -DskipTests && cd ..
