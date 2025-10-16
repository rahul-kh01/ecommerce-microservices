# 🚀 Ports & Commands Reference

## Port Configuration

| Service | Port | URL | Command |
|---------|------|-----|---------|
| **Frontend Dev** | 5173 | http://localhost:5173 | `bun run dev` |
| **Frontend Preview** | 4173 | http://localhost:4173 | `bun run preview` |
| **Backend API** | 8080 | http://localhost:8080 | (Spring Boot) |

## Common Commands

### Development (Hot Reload)
```bash
bun run dev
# Opens: http://localhost:5173
# Changes reload automatically
```

### Production Preview
```bash
bun run build    # Build first
bun run preview  # Preview the build
# Opens: http://localhost:4173
```

### Quick Start
```bash
# Use the convenience script
make dev
# Or
./dev-fast.sh
```

## Port 3000?
**Note**: There is no service running on port 3000 by default.
- Frontend runs on **5173** (dev) or **4173** (preview)
- Backend runs on **8080**

## Full Stack Development

To run both frontend and backend:

```bash
# Terminal 1 - Backend (port 8080)
cd sb-ecom
./mvnw spring-boot:run

# Terminal 2 - Frontend (port 5173)
cd ecom-frontend
bun run dev
```

Then access:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api

## Troubleshooting

### Port already in use?
```bash
# Check what's using port 5173
lsof -i :5173
# Or use make
make port-check
```

### Can't access website?
1. Make sure you're using the correct port (5173 for dev)
2. Check if the dev server is running
3. Look for errors in the terminal

### Build not updating?
```bash
# Clear cache and rebuild
bun run clean
bun run build
```

## Quick Commands

```bash
bun run dev          # Development on :5173
bun run build        # Build production
bun run preview      # Preview on :4173
make dev             # Alternative dev start
make preview         # Alternative preview
```

