#!/bin/bash

# Quick Start Frontend Script
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🚀 Starting E-commerce Frontend with Bun"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed!"
    echo "Run: curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

echo "✅ Bun version: $(bun --version)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    bun install
    echo ""
fi

echo "🚀 Starting development server..."
echo ""
echo "📍 Frontend will be available at:"
echo "   http://localhost:5173"
echo ""
echo "📍 Make sure your backend is running at:"
echo "   http://localhost:8080"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start dev server
bun run dev
