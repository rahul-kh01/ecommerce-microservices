#!/bin/bash

# Fast development setup script with Bun
echo "🚀 Setting up fast development environment with Bun..."

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed!"
    echo "📥 Install Bun: curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

echo "✅ Bun version: $(bun --version)"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies with Bun..."
    bun install --frozen-lockfile
fi

# Clear caches for fresh start
echo "🧹 Clearing caches..."
bun run clean

# Set development environment
export NODE_ENV=development
export VITE_DEV_MODE=true
export VITE_FAST_REFRESH=true

# Start development server with Bun optimizations
echo "🔥 Starting fast development server with Bun..."
bun run dev:fast

echo "✅ Development server started!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔗 Backend: http://localhost:8080"
