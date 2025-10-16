# Frontend Environment Setup

## Required Environment Variables

Create a `.env` file in the root of the `ecom-frontend` directory with the following variables:

### Development (.env)
```bash
# Backend API Configuration
VITE_BACK_END_URL=http://localhost:8080

# Environment Mode
NODE_ENV=development
```

### Docker Compose (.env.docker)
```bash
# Backend API Configuration
VITE_BACK_END_URL=http://localhost:80

# Environment Mode
NODE_ENV=production
```

### Production (.env.production)
```bash
# Backend API Configuration
VITE_BACK_END_URL=https://api.your-domain.com

# Environment Mode
NODE_ENV=production
```

## Optional Variables

```bash
# API Timeout (milliseconds) - Default: 30000
VITE_API_TIMEOUT=30000

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

## Setup Instructions

1. **For Local Development:**
   ```bash
   cp ENV_SETUP.md .env
   # Edit .env with your local configuration
   ```

2. **For Docker:**
   - The docker-compose.yml should set `VITE_BACK_END_URL=http://localhost:80`

3. **For Production:**
   ```bash
   export VITE_BACK_END_URL=https://api.your-domain.com
   npm run build
   ```

## Environment Detection

The frontend automatically uses:
- `.env` - Base configuration
- `.env.local` - Local overrides (not committed to git)
- `.env.production` - Production build
- `.env.development` - Development build

## Current API Configuration

The API client is configured in `src/api/api.js`:
```javascript
baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`
```

Make sure your backend URL does NOT include `/api` suffix as it's added automatically.

