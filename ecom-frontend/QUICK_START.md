# ⚡ Quick Start Guide - Bun Edition

Get started with the E-commerce frontend using Bun in under 2 minutes!

## 🚀 Super Quick Start

```bash
# 1. Install Bun (if not installed)
curl -fsSL https://bun.sh/install | bash

# 2. Install dependencies
bun install

# 3. Start development
bun run dev
```

That's it! Open http://localhost:5173 🎉

## 📋 Quick Commands Cheat Sheet

### Essential Commands
```bash
bun install          # Install dependencies (1 second!)
bun run dev         # Start dev server
bun run build       # Build for production
bun run preview     # Preview production build
```

### Using Make (Alternative)
```bash
make setup          # Complete setup
make dev            # Start development
make build          # Build production
make help           # Show all commands
```

### Using Scripts
```bash
./bun-install.sh    # Automated Bun setup
./dev-fast.sh       # Fast dev server start
```

## 🎯 Common Tasks

### First Time Setup
```bash
# Automated (recommended)
./bun-install.sh

# Manual
bun install --frozen-lockfile
```

### Development
```bash
# Standard
bun run dev

# Fast mode
./dev-fast.sh

# With Make
make dev
```

### Production Build
```bash
bun run build       # Build
bun run preview     # Preview

# Or with Make
make build
make preview
```

### Docker
```bash
# Build image
docker build -t ecom-frontend .

# Run container
docker run -p 80:80 ecom-frontend

# Or with Make
make docker-build
make docker-run
```

## 🔧 Environment Setup

### Create .env file
```bash
cp .env.example .env
```

### Edit .env
```env
VITE_BACK_END_URL=http://localhost:8080
NODE_ENV=development
```

## 🐛 Troubleshooting

### Bun not found?
```bash
export PATH="$HOME/.bun/bin:$PATH"
echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc
```

### Port already in use?
```bash
# Check what's using port 5173
lsof -i :5173

# Or use Make
make port-check
```

### Dependencies issue?
```bash
# Clean and reinstall
bun run clean:full
bun install
```

## 📚 More Information

- **Complete Guide**: [BUN_SETUP.md](./BUN_SETUP.md)
- **Migration**: [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- **All Commands**: `make help`
- **Bun Docs**: https://bun.sh/docs

## ⚡ Performance

With Bun you get:
- **6x faster** dependency installation
- **2.75x faster** production builds
- **3x faster** dev server startup

Enjoy blazing-fast development! 🔥

