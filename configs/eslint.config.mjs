import { defineConfig, globalIgnores } from "eslint/config"
import eslint from "@eslint/js"
import globals from "globals"
import eslintPluginUnicorn from "eslint-plugin-unicorn"
import eslintParser from "@babel/eslint-parser"

const ignores = ["configs/**", "dist/**", "__tests__/**"]

export default defineConfig([
  //继承eslint的推荐规则
  eslint.configs.recommended,
  globalIgnores(ignores),
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      parser: eslintParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-env"],
        },
      },
    },
    plugins: {
      unicorn: eslintPluginUnicorn,
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: "warn",
    },
    //具体规则
    rules: {
      "no-var": 2, // 不能使用 var 定义变量
      //临时关闭未使用变量报错
      "no-unused-vars": 0,
      //临时关闭未使用私有变量报错的问题
      "no-unused-private-class-members": 0,
      "unicorn/no-array-for-each": "warn",
      // "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
])
