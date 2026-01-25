import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      util: 'src/util/index.ts',
    },
    minify: true,
  },
])
