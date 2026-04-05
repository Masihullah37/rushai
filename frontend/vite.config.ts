import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split Three.js ecosystem into its own chunk
          if (id.includes('three') || id.includes('@react-three/fiber') || id.includes('@react-three/drei')) {
            return 'three-vendor';
          }
          // Split React into its own chunk (already working)
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }
        },
      },
    },
    // Increase limit to suppress warning (chunks will be smaller)
    chunkSizeWarningLimit: 1000,
  },
})


