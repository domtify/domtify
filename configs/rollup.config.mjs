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

  // json(),
  babel({
    babelHelpers: "bundled",
    exclude: ["node_modules/**"],
    configFile: "./configs/babel.config.mjs",
  }),
  cleanup(),
  strip(),
]

if (isProd) {
  // 如果生产环境
  plugins.push(
    terser({
      output: {
        comments() {
          return false
        },
      },
    }),
  )
}

const esmDir = "dist/esm"
const cjsDir = "dist/cjs"

let config = defineConfig([
  // iife
  {
    input: "src/wrappers/bundle.js",
    output: {
      file: `dist/domtify.${isProd ? "min." : ""}js`,
      format: "iife",
      sourcemap: true,
    },
    onwarn(warning, warn) {
      //源码内部自己处理全局的变量,忽略掉rollup构建iife格式不传name属性时控制台的黄色警告
      if (warning.code === "MISSING_NAME_OPTION_FOR_IIFE_EXPORT") {
        return // 忽略警告
      }
      warn(warning)
    },
    plugins,
  },
  // ESM
  {
    input: "src/wrappers/module.js",
    output: {
      dir: esmDir,
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: false,
    },
    plugins: [
      ...plugins,
      del({ targets: `${esmDir}/wrappers`, hook: "writeBundle" }),
    ],
    treeshake: {
      moduleSideEffects: true, // 非副作用模块才参与 tree shaking
    },
  },

  //CJS
  {
    input: "src/wrappers/module.js",
    output: {
      dir: cjsDir,
      format: "cjs",
      sourcemap: false,
      preserveModules: true,
      preserveModulesRoot: "src",
      exports: "auto",
    },
    plugins: [
      ...plugins,
      del({ targets: `${cjsDir}/wrappers`, hook: "writeBundle" }),
    ],
    treeshake: {
      moduleSideEffects: true,
    },
  },
])

if (isProd) {
  // 只保留amd和iife,esm cjs 不需要再次压缩
  config = config.filter((item) => ["iife", "amd"].includes(item.output.format))
}

export default config
