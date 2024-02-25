import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '',
  plugins: [react()],
  // @ts-expect-error vite config type is not up to date
  test: {
    coverage: {
      provider: 'v8',
    },
  },
});
