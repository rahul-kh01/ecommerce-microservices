# Multi-stage build for optimal caching and size with Bun
FROM oven/bun:1.1.38-alpine AS deps
WORKDIR /app

# Copy package files first for better caching
COPY package.json bun.lockb* ./
# Install dependencies with Bun (much faster than yarn/npm)
RUN bun install --frozen-lockfile --production=false

# Build stage with Bun optimizations
FROM oven/bun:1.1.38-alpine AS build
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY package.json bun.lockb* ./

# Copy source code
COPY . .

# Build arguments
ARG VITE_BACK_END_URL=http://localhost:8080
ENV VITE_BACK_END_URL=$VITE_BACK_END_URL
ENV NODE_ENV=production

# Build with Bun (significantly faster)
RUN bun run build && \
    rm -rf node_modules

# Production stage (ultra-lightweight)
FROM nginx:1.29.1-alpine3.22-slim AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Remove default content and copy nginx config
RUN rm -rf /usr/share/nginx/html/*

# Copy nginx configuration
COPY nginx-simple.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
