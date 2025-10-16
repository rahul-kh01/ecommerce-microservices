# Makefile for Bun-based E-commerce Frontend
# Provides convenient commands for common tasks

.PHONY: help install dev build clean docker-build docker-run lint test

# Default target
.DEFAULT_GOAL := help

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[1;33m
RED := \033[0;31m
NC := \033[0m # No Color

help: ## Show this help message
	@echo "$(BLUE)E-commerce Frontend - Bun Commands$(NC)"
	@echo "======================================"
	@awk 'BEGIN {FS = ":.*##"; printf "\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2 } /^##@/ { printf "\n$(YELLOW)%s$(NC)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
	@echo ""

##@ Setup Commands

check-bun: ## Check if Bun is installed
	@if command -v bun > /dev/null; then \
		echo "$(GREEN)✓ Bun is installed: $$(bun --version)$(NC)"; \
	else \
		echo "$(RED)✗ Bun is not installed$(NC)"; \
		echo "$(YELLOW)Install: curl -fsSL https://bun.sh/install | bash$(NC)"; \
		exit 1; \
	fi

install: check-bun ## Install dependencies with Bun
	@echo "$(BLUE)Installing dependencies...$(NC)"
	@bun install --frozen-lockfile
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

install-fast: check-bun ## Fast install without lockfile
	@echo "$(BLUE)Fast installing dependencies...$(NC)"
	@bun install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

setup: ## Complete project setup
	@echo "$(BLUE)Setting up project...$(NC)"
	@chmod +x bun-install.sh dev-fast.sh
	@./bun-install.sh
	@echo "$(GREEN)✓ Setup complete$(NC)"

##@ Development Commands

dev: check-bun ## Start development server
	@echo "$(BLUE)Starting development server...$(NC)"
	@bun run dev

dev-fast: check-bun ## Start fast development server
	@echo "$(BLUE)Starting fast development server...$(NC)"
	@./dev-fast.sh

preview: check-bun ## Preview production build
	@echo "$(BLUE)Starting preview server...$(NC)"
	@bun run preview

##@ Build Commands

build: check-bun ## Build for production
	@echo "$(BLUE)Building for production...$(NC)"
	@bun run build
	@echo "$(GREEN)✓ Build complete$(NC)"

build-fast: check-bun ## Fast production build
	@echo "$(BLUE)Fast building for production...$(NC)"
	@bun run build:fast
	@echo "$(GREEN)✓ Fast build complete$(NC)"

build-analyze: check-bun ## Build with bundle analysis
	@echo "$(BLUE)Building with analysis...$(NC)"
	@bun run build:analyze
	@echo "$(GREEN)✓ Analyzed build complete$(NC)"

##@ Docker Commands

docker-build: ## Build Docker image with Bun
	@echo "$(BLUE)Building Docker image...$(NC)"
	@docker build -t ecom-frontend:latest .
	@echo "$(GREEN)✓ Docker image built$(NC)"

docker-build-prod: ## Build Docker image for production
	@echo "$(BLUE)Building production Docker image...$(NC)"
	@docker build --build-arg VITE_BACK_END_URL=$$VITE_BACK_END_URL -t ecom-frontend:prod .
	@echo "$(GREEN)✓ Production Docker image built$(NC)"

docker-run: ## Run Docker container
	@echo "$(BLUE)Starting Docker container...$(NC)"
	@docker run -p 80:80 --name ecom-frontend ecom-frontend:latest
	@echo "$(GREEN)✓ Container started$(NC)"

docker-dev: ## Run development with docker-compose
	@echo "$(BLUE)Starting development with Docker Compose...$(NC)"
	@docker-compose -f docker-compose.bun.yml up frontend-dev
	@echo "$(GREEN)✓ Docker dev started$(NC)"

docker-stop: ## Stop Docker container
	@echo "$(BLUE)Stopping Docker container...$(NC)"
	@docker stop ecom-frontend || true
	@docker rm ecom-frontend || true
	@echo "$(GREEN)✓ Container stopped$(NC)"

docker-clean: ## Clean Docker images and containers
	@echo "$(BLUE)Cleaning Docker resources...$(NC)"
	@docker-compose -f docker-compose.bun.yml down -v
	@docker rmi ecom-frontend:latest || true
	@echo "$(GREEN)✓ Docker cleaned$(NC)"

##@ Quality Commands

lint: check-bun ## Run ESLint
	@echo "$(BLUE)Running linter...$(NC)"
	@bun run lint
	@echo "$(GREEN)✓ Lint complete$(NC)"

lint-fix: check-bun ## Fix ESLint errors
	@echo "$(BLUE)Fixing lint errors...$(NC)"
	@bun run lint:fix
	@echo "$(GREEN)✓ Lint fixed$(NC)"

type-check: check-bun ## Run TypeScript type checking
	@echo "$(BLUE)Checking types...$(NC)"
	@bun run type-check
	@echo "$(GREEN)✓ Type check complete$(NC)"

##@ Maintenance Commands

clean: ## Clean build artifacts
	@echo "$(BLUE)Cleaning build artifacts...$(NC)"
	@bun run clean
	@echo "$(GREEN)✓ Cleaned$(NC)"

clean-full: ## Clean everything including node_modules
	@echo "$(YELLOW)⚠ This will remove node_modules and lockfile$(NC)"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		bun run clean:full; \
		echo "$(GREEN)✓ Full clean complete$(NC)"; \
	fi

update: check-bun ## Update dependencies
	@echo "$(BLUE)Updating dependencies...$(NC)"
	@bun update
	@echo "$(GREEN)✓ Dependencies updated$(NC)"

upgrade-bun: ## Upgrade Bun to latest version
	@echo "$(BLUE)Upgrading Bun...$(NC)"
	@bun upgrade
	@echo "$(GREEN)✓ Bun upgraded$(NC)"

##@ Info Commands

info: check-bun ## Show project info
	@echo "$(BLUE)Project Information$(NC)"
	@echo "===================="
	@echo "Bun version:    $$(bun --version)"
	@echo "Node modules:   $$(if [ -d node_modules ]; then echo 'Installed'; else echo 'Not installed'; fi)"
	@echo "Lockfile:       $$(if [ -f bun.lockb ]; then echo 'Present'; else echo 'Missing'; fi)"
	@echo "Build output:   $$(if [ -d dist ]; then echo 'Present'; else echo 'Not built'; fi)"

deps: check-bun ## Show dependency tree
	@echo "$(BLUE)Dependency Tree$(NC)"
	@bun pm ls

outdated: check-bun ## Check for outdated packages
	@echo "$(BLUE)Checking for updates...$(NC)"
	@bun outdated

##@ Quick Commands

all: install build ## Install and build

fresh: clean-full install build ## Fresh install and build

quick: install-fast dev ## Quick start development

prod: build preview ## Build and preview production

##@ Testing Commands

test: ## Run tests (placeholder)
	@echo "$(YELLOW)No tests configured yet$(NC)"

test-watch: ## Run tests in watch mode (placeholder)
	@echo "$(YELLOW)No tests configured yet$(NC)"

##@ Utility Commands

size: ## Check build size
	@if [ -d dist ]; then \
		echo "$(BLUE)Build Size:$(NC)"; \
		du -sh dist; \
		echo "\n$(BLUE)Detailed Size:$(NC)"; \
		du -sh dist/*; \
	else \
		echo "$(YELLOW)No build found. Run 'make build' first$(NC)"; \
	fi

port-check: ## Check if port 5173 is available
	@echo "$(BLUE)Checking port 5173...$(NC)"
	@if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then \
		echo "$(RED)✗ Port 5173 is in use$(NC)"; \
		lsof -Pi :5173 -sTCP:LISTEN; \
	else \
		echo "$(GREEN)✓ Port 5173 is available$(NC)"; \
	fi

logs: ## Show development logs (if running in background)
	@echo "$(BLUE)Showing logs...$(NC)"
	@tail -f logs/*.log 2>/dev/null || echo "$(YELLOW)No logs found$(NC)"

# Version display
version:
	@echo "Bun: $$(bun --version)"
	@echo "Project: $$(cat package.json | grep version | head -1 | awk -F: '{ print $$2 }' | sed 's/[",]//g' | tr -d '[:space:]')"

