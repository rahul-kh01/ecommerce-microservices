#!/bin/bash

cd ../..

# Build all services
cd eureka && ./mvnw clean package -DskipTests && cd ..
cd gateway && ./mvnw clean package -DskipTests && cd ..
cd configserver && ./mvnw clean package -DskipTests && cd ..
cd order && ./mvnw clean package -DskipTests && cd ..
cd user && ./mvnw clean package -DskipTests && cd ..
cd product && ./mvnw clean package -DskipTests && cd ..