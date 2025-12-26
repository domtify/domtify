import { defineConfig } from "rollup"
import alias from "@rollup/plugin-alias"
import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import json from "@rollup/plugin-json"
import del from "rollup-plugin-delete"
import path from "path"
import { fileURLToPath } from "url"
import cleanup from "rollup-plugin-cleanup"
import strip from "@rollup/plugin-strip"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isProd = process.env.NODE_ENV === "production"

const plugins = [
  alias({
    entries: [{ find: "@", replacement: path.resolve(__dirname, "../src") }],
  }),
  json(),
  resolve(),
  commonjs(),
  json(),
  babel({
    babelHelpers: "bundled",
    exclude: ["node_modules/**"],
    configFile: "./configs/babel.config.mjs",
  }),
  // cleanup(),
  // strip(),
  // terser(),
]

const esmDir = "dist/esm"

let config = defineConfig([
  // ESM
  {
    input: "src/index.js",
    output: {
      dir: esmDir,
      format: "esm",
    },
    plugins: [...plugins],
  },
  // 助手单独打包
  {
    input: "src/utilities.js",
    output: {
      file: `${esmDir}/utilities.js`,
      format: "esm",
    },
    plugins: [...plugins],
  },
  {
    input: "src/index.iife.js",
    output: {
      name: "d",
      format: "iife",
      file: "dist/domtify.js",
    },
    plugins: [...plugins],
  },
])

export default config
