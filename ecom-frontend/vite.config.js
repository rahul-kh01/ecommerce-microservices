import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    fastRefresh: true,
    // Enable React optimizations
    jsxImportSource: '@emotion/react',
    babel: {
      plugins: ['@emotion/babel-plugin']
    }
  })],
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      overlay: false,
      port: 5173
    },
    // Enable faster file watching
    watch: {
      usePolling: false,
      useFsEvents: true
    },
    proxy: {
      '/api': {
        target: process.env.VITE_BACK_END_URL || 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // Enable keep-alive for better performance
        agent: false
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: false,
        pure_funcs: []
      }
    },
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React ecosystem
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor'
          }
          // Redux ecosystem
          if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
            return 'redux-vendor'
          }
          // Material-UI ecosystem
          if (id.includes('@mui') || id.includes('@emotion')) {
            return 'ui-vendor'
          }
          // Router
          if (id.includes('react-router')) {
            return 'router-vendor'
          }
          // Icons
          if (id.includes('react-icons')) {
            return 'icons-vendor'
          }
          // Other large libraries
          if (id.includes('axios') || id.includes('swiper')) {
            return 'utils-vendor'
          }
        },
        // Optimize chunk names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
          if (facadeModuleId) {
            const name = facadeModuleId.split('/').pop().replace('.jsx', '').replace('.js', '')
            return `assets/${name}-[hash].js`
          }
          return 'assets/[name]-[hash].js'
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 2000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Target modern browsers for smaller bundles
    target: 'esnext'
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@reduxjs/toolkit',
      'react-redux',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
      'axios'
    ],
    // Force pre-bundling of these dependencies
    force: true
  },
  // Enable esbuild for faster builds
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  // Cache optimization
  cacheDir: 'node_modules/.vite'
})