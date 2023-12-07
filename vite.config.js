import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  testEnvironment: 'jsdom',
  test: {
    globals: true,
    environment: "jsdom",
    },
});
