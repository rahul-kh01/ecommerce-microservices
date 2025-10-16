#!/bin/bash

# Bun Installation and Setup Script
# This script installs Bun and sets up the project

set -e

echo "🚀 Bun Installation and Setup Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Bun is already installed
if command -v bun &> /dev/null; then
    CURRENT_VERSION=$(bun --version)
    echo -e "${GREEN}✅ Bun is already installed: v${CURRENT_VERSION}${NC}"
    read -p "Do you want to upgrade Bun? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📦 Upgrading Bun..."
        bun upgrade
    fi
else
    echo -e "${YELLOW}📥 Installing Bun...${NC}"
    
    # Detect OS
    OS="$(uname -s)"
    case "${OS}" in
        Linux*)     
            echo "🐧 Detected Linux"
            curl -fsSL https://bun.sh/install | bash
            ;;
        Darwin*)    
            echo "🍎 Detected macOS"
            curl -fsSL https://bun.sh/install | bash
            ;;
        MINGW*|MSYS*|CYGWIN*)     
            echo "🪟 Detected Windows (WSL recommended)"
            curl -fsSL https://bun.sh/install | bash
            ;;
        *)          
            echo -e "${RED}❌ Unsupported OS: ${OS}${NC}"
            exit 1
            ;;
    esac
    
    # Add Bun to PATH for current session
    export PATH="$HOME/.bun/bin:$PATH"
    
    echo -e "${GREEN}✅ Bun installed successfully!${NC}"
fi

# Verify Bun installation
if ! command -v bun &> /dev/null; then
    echo -e "${RED}❌ Bun installation failed!${NC}"
    echo "Please install Bun manually: https://bun.sh/docs/installation"
    exit 1
fi

echo ""
echo "📌 Bun version: $(bun --version)"
echo ""

# Clean up old package manager files
echo "🧹 Cleaning up old package manager files..."
if [ -f "package-lock.json" ]; then
    rm -f package-lock.json
    echo "  ✓ Removed package-lock.json"
fi

if [ -f "yarn.lock" ]; then
    echo -e "${YELLOW}⚠️  Found yarn.lock${NC}"
    read -p "Remove yarn.lock and use Bun instead? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -f yarn.lock
        echo "  ✓ Removed yarn.lock"
    fi
fi

# Install dependencies with Bun
echo ""
echo "📦 Installing dependencies with Bun..."
bun install

# Verify installation
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ Dependencies installed successfully!${NC}"
else
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

# Create bun.lockb if it doesn't exist
if [ ! -f "bun.lockb" ]; then
    echo "🔒 Generating lockfile..."
    bun install --frozen-lockfile
fi

# Set execute permissions for scripts
echo "🔧 Setting execute permissions for scripts..."
chmod +x dev-fast.sh 2>/dev/null || true
chmod +x bun-install.sh 2>/dev/null || true

echo ""
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo ""
echo "📝 Available commands:"
echo "  bun run dev          - Start development server"
echo "  bun run dev:fast     - Start fast development server"
echo "  bun run build        - Build for production"
echo "  bun run preview      - Preview production build"
echo "  bun run lint         - Run linter"
echo ""
echo "🚀 Get started:"
echo "  bun run dev"
echo ""
echo "📚 Documentation: BUN_SETUP.md"
echo ""

