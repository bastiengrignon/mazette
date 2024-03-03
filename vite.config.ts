import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '',
  plugins: [react(), splitVendorChunkPlugin()],
  // @ts-expect-error vite config type is not up to date
  test: {
    coverage: {
      provider: 'v8',
    },
  },
  server: {
    host: true,
  },
});
