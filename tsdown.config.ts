import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      util: 'src/util/index.ts',
    },
  },
  {
    entry: 'src/index.iife.ts',
    sourcemap: true,
    format: 'iife',
    minify: true,
    outputOptions: {
      dir: undefined,
      name: 'd',
      file: `dist/domtify.js`,
    },
  },
])
