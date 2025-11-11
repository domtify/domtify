import { rm, rename } from "fs/promises"
import { defineConfig } from "tsdown"
const isProd = process.env.NODE_ENV === "production"

const esmDir = "dist/esm"
const cjsDir = "dist/cjs"

async function cleanBuildFiles(format, dts = false) {
  format = format || "esm"

  const isEsm = format === "esm"

  const dir = isEsm ? esmDir : cjsDir
  const suffix = isEsm ? "mjs" : "cjs"
  const dts_suffix = isEsm ? "d.mts" : "d.cts"
  if (dts) {
    try {
      await rm(`${dir}/module.${suffix}`)
    } catch {
      // 文件不存在，直接忽略
    }

    await rename(`${dir}/module.${dts_suffix}`, `${dir}/index.${dts_suffix}`)
  } else {
    await rm(`${dir}/methods.${suffix}`)
    await rm(`${dir}/module.${suffix}`)
    await rm(`${dir}/utilities.${suffix}`)
  }
}

const configs = [
  defineConfig({
    clean: false,
    entry: "src/wrappers/bundle.ts",
    format: ["iife"],
    minify: isProd,
    sourcemap: true,
    outputOptions(outputOptions) {
      outputOptions.dir = undefined
      outputOptions.file = `dist/domtify.${isProd ? "min." : ""}js`
      return outputOptions
    },
  }),
]

if (!isProd) {
  const entry = `src/wrappers/module.ts`
  configs.push(
    ...defineConfig([
      {
        clean: false,
        dts: false,
        entry: ["src/wrappers/module.ts"],
        unbundle: true,
        format: ["esm"],
        outputOptions(outputOptions) {
          outputOptions.dir = esmDir
          outputOptions.preserveModulesRoot = "src"
          return outputOptions
        },
        hooks: {
          "build:done": async () => {
            await cleanBuildFiles("esm", false)
          },
        },
      },
      {
        clean: false,
        dts: true,
        entry: ["src/wrappers/module.ts"],
        format: ["esm"],
        outputOptions(outputOptions) {
          outputOptions.dir = esmDir
          return outputOptions
        },
        hooks: {
          "build:done": async () => {
            await cleanBuildFiles("esm", true)
          },
        },
      },
      {
        clean: false,
        dts: false,
        entry: ["src/wrappers/module.ts"],
        unbundle: true,
        format: ["cjs"],
        outputOptions(outputOptions) {
          outputOptions.dir = cjsDir
          outputOptions.preserveModulesRoot = "src"
          return outputOptions
        },
        hooks: {
          "build:done": async () => {
            await cleanBuildFiles("cjs", false)
          },
        },
      },
      {
        clean: false,
        dts: true,
        entry: ["src/wrappers/module.ts"],
        format: ["cjs"],
        outputOptions(outputOptions) {
          outputOptions.dir = cjsDir
          return outputOptions
        },
        hooks: {
          "build:done": async () => {
            await cleanBuildFiles("cjs", true)
          },
        },
      },
    ]),
  )
}

export default configs
