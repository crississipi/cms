import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    // Use the same module resolution as Next.js
    alias: {
      '@': new URL('./', import.meta.url).pathname,
    },
  },
});
