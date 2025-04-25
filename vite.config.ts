import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
    testTimeout: 10000, // <-- aqui!
    coverage: {
      provider: 'v8', // ou 'istanbul' se der erro novamente
      reporter: ['text', 'lcov'], // você pode ajustar os tipos de saída
    },
  },
})
