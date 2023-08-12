import { nodeResolve } from '@rollup/plugin-node-resolve';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts'; ;

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@google-keep-clone/core',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      output: {
        globals: { crypto: 'crypto' },
      },
      external: ['crypto'],
      plugins: [nodeResolve({ preferBuiltins: true })],
    },
  },
  plugins: [dts()],
});

