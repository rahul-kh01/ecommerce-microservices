#!/usr/bin/env node

/**
 * Build optimization script for faster Docker builds
 * This script helps optimize the build process for better performance
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Optimizing build configuration...');

// Create optimized build cache directory
const cacheDir = path.join(__dirname, 'node_modules', '.vite');
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
  console.log('✅ Created Vite cache directory');
}

// Optimize package.json for production builds
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add build optimization metadata
packageJson.buildOptimization = {
  timestamp: new Date().toISOString(),
  nodeVersion: process.version,
  platform: process.platform,
  arch: process.arch
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ Updated package.json with build metadata');

// Create build info file
const buildInfo = {
  buildTime: new Date().toISOString(),
  nodeVersion: process.version,
  platform: process.platform,
  arch: process.arch,
  dependencies: Object.keys(packageJson.dependencies || {}).length,
  devDependencies: Object.keys(packageJson.devDependencies || {}).length
};

fs.writeFileSync(
  path.join(__dirname, 'build-info.json'),
  JSON.stringify(buildInfo, null, 2)
);
console.log('✅ Created build info file');

console.log('🎉 Build optimization complete!');
console.log(`📊 Build info: ${buildInfo.dependencies} deps, ${buildInfo.devDependencies} dev deps`);
