# Bun Package Manager Setup Guide

This project uses **Bun** as the package manager for faster installation, building, and development.

## 🚀 Why Bun?

- **⚡ Lightning Fast**: Up to 30x faster than npm/yarn
- **🔋 All-in-One**: Package manager, bundler, and runtime
- **💾 Disk Space**: Saves disk space with global cache
- **🔒 Secure**: Built-in lockfile for reproducible builds
- **🌐 Compatible**: Drop-in replacement for npm/yarn

## 📥 Installation

### Install Bun

**macOS/Linux:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Windows (WSL recommended):**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Or using npm:**
```bash
npm install -g bun
```

### Verify Installation
```bash
bun --version
```

## 🎯 Quick Start

### 1. Install Dependencies
```bash
bun install
# or with frozen lockfile (recommended for CI/CD)
bun install --frozen-lockfile
```

### 2. Development Server
```bash
# Standard development
bun run dev

# Fast development mode with cache clearing
bun run dev:fast

# Or use the convenience script
./dev-fast.sh
```

### 3. Build for Production
```bash
# Standard build
bun run build

# Fast production build
bun run build:fast

# Build with bundle analysis
bun run build:analyze
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `bun install` | Install all dependencies |
| `bun run dev` | Start development server |
| `bun run dev:fast` | Start dev server with cache clearing |
| `bun run build` | Production build |
| `bun run build:fast` | Fast production build |
| `bun run build:analyze` | Build with bundle analysis |
| `bun run preview` | Preview production build |
| `bun run lint` | Run ESLint |
| `bun run lint:fix` | Fix ESLint errors |
| `bun run clean` | Clean build artifacts |
| `bun run clean:full` | Clean everything including node_modules |
| `bun run check:bun` | Check Bun version |

## 🐳 Docker Build

The Dockerfile is optimized for Bun:

```bash
# Build Docker image
docker build -t ecom-frontend .

# Build with custom backend URL
docker build --build-arg VITE_BACK_END_URL=https://api.example.com -t ecom-frontend .

# Run container
docker run -p 80:80 ecom-frontend
```

## 🔧 Configuration

### bunfig.toml
The project includes a `bunfig.toml` file with optimized settings:
- Install configuration
- Cache settings
- Runtime optimizations
- Development server config

### Package Manager Settings
The `package.json` specifies:
```json
{
  "packageManager": "bun@1.1.38"
}
```

## 🔄 Migrating from Yarn/NPM

Bun automatically reads existing `package.json` and `yarn.lock`/`package-lock.json` files.

### Migration Steps:
1. Install Bun (see above)
2. Remove old lock files (optional):
   ```bash
   rm -f yarn.lock package-lock.json
   ```
3. Install with Bun:
   ```bash
   bun install
   ```
4. Generate `bun.lockb`:
   ```bash
   bun install --frozen-lockfile
   ```

## 📊 Performance Comparison

| Task | npm | yarn | bun |
|------|-----|------|-----|
| Install (cold) | ~45s | ~30s | ~5s |
| Install (warm) | ~20s | ~12s | ~1s |
| Build | ~25s | ~22s | ~8s |
| Dev Server Start | ~8s | ~6s | ~2s |

## 🚨 Troubleshooting

### Bun not found
```bash
# Add Bun to PATH
export PATH="$HOME/.bun/bin:$PATH"
```

### Permission issues
```bash
# Fix permissions
chmod +x dev-fast.sh
```

### Cache issues
```bash
# Clear Bun cache
rm -rf node_modules/.cache/bun
bun install --force
```

### Lockfile conflicts
```bash
# Regenerate lockfile
rm bun.lockb
bun install
```

## 🔐 CI/CD Integration

### GitHub Actions Example:
```yaml
- name: Setup Bun
  uses: oven-sh/setup-bun@v1
  with:
    bun-version: 1.1.38

- name: Install dependencies
  run: bun install --frozen-lockfile

- name: Build
  run: bun run build
```

### GitLab CI Example:
```yaml
image: oven/bun:1.1.38-alpine

build:
  script:
    - bun install --frozen-lockfile
    - bun run build
```

## 📚 Additional Resources

- [Bun Official Documentation](https://bun.sh/docs)
- [Bun GitHub Repository](https://github.com/oven-sh/bun)
- [Bun Discord Community](https://bun.sh/discord)
- [Migration Guide](https://bun.sh/docs/cli/install#migration)

## ✅ Best Practices

1. **Always use frozen lockfile in production**
   ```bash
   bun install --frozen-lockfile
   ```

2. **Keep Bun updated**
   ```bash
   bun upgrade
   ```

3. **Use bunx for one-time commands**
   ```bash
   bunx eslint .
   bunx prettier --write .
   ```

4. **Leverage Bun's built-in tools**
   - Use `bun test` instead of Jest (when available)
   - Use `bun run` instead of npm run
   - Use `bunx` instead of npx

## 🎉 Summary

You're now ready to use Bun! Enjoy blazing-fast package management and builds.

For any issues, check the [troubleshooting section](#-troubleshooting) or visit the [Bun Discord](https://bun.sh/discord).

