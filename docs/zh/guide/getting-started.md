# 快速开始

## 浏览器

浏览器用户可以通过下面提供的CDN地址直接在页面上引入

```html
<script src="https://unpkg.com/domtify@latest/dist/domtify.min.js"></script>
<!-- or -->
<script src="https://cdn.jsdelivr.net/npm/domtify@latest/dist/domtify.min.js"></script>
```

::: warning
如果是直接CDN在页面引入,将提供所有的方法和助手的完整包
:::

::: tip
如果你想锁定到特定版本，你应该更换@latest 到指定版本(例如@0.0.1),您可以在[unpkg](https://unpkg.com/domtify@latest/dist/),[jsdelivr](https://cdn.jsdelivr.net/npm/domtify@latest/dist/)找到可用模块的完整列表
:::

### 起始模板

```html
<!doctype html>
<html lang="zh">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>domtify demo</title>
  </head>
  <body>
    <h1>Hello, World!</h1>

    <script src="https://cdn.jsdelivr.net/npm/domtify@latest/dist/domtify.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios@1.12.2/dist/axios.min.js"></script>
    <script>
      d(() => {
        // document文档准备就绪
        d("h1").text("Hello, domtify!")

        // 由于domtify不包含ajax模块,把原本jQuery中的 $.get() 换成axios库来发起请求
        axios
          .get("https://jsonplaceholder.typicode.com/todos/1")
          .then((response) => {
            console.log(response.data)
          })
          .catch((error) => {
            console.error(error)
          })
      })
    </script>
  </body>
</html>
```

> [!TIP]
> 至于为什么domtify不包含ajax模块,请查看[迁移指南](/guide/migration#不支持ajax模块)查看原因,以及查看更多需要主意的信息。axios库的文档[快捷入口](https://axios-http.com/docs/intro)🚀

## 包管理器

### 安装

::: code-group

```sh [npm]
$ npm add -D domtify
```

```sh [pnpm]
$ pnpm add -D domtify
```

```sh [yarn]
$ yarn add -D domtify
```

```sh [bun]
$ bun add -D domtify
```

:::

### 基本用法

:::tabs
== ES Modules

```js
// 导入核心
import d from "domtify"
// 或者你也可以使用熟悉的$
// import $ from "domtify"

// 导入您需要的链式方法
import "domtify/methods/each"
import "domtify/methods/addClass"

// 导入您需要的一些实用程序
import "domtify/utilities/extend"
import "domtify/utilities/isArray"
import "domtify/utilities/isFunction"
import "domtify/utilities/isPlainObject"

// 然后您就可以像往常(无学习成本)您使用jQuery一样类似的用法
d("h3").addClass("foo")
// 实用助手方法
d.isFunction(function fn() {}) // => true
```

== CommonJS

```js
// 导入核心
const d = require("domtify")

// 插件/方法扩展
require("domtify/methods/addClass")
require("domtify/utilities/isFunction")

d("h3").addClass("foo")
d.isFunction(() => {}) // true
```

:::

### 自动导入

如果每用到一个方法都要手动导入一遍,其实是相当繁琐的😫,别担心，domtify是充满爱的❤。

domtify提供了一个自动导入的工具旨在减轻您的负担,让您开发变得更加高效。

`unplugin-ast` 库可以在配合 `@domtify/auto-import-transformer` 使用时，自动导入使用到的方法和助手。首先，将这些包作为开发依赖安装。

```bash
npm i unplugin-ast -D
npm i @domtify/auto-import-transformer -D
```

> [!TIP]
> [unplugin-ast](https://github.com/unplugin/unplugin-ast)插件是支持非常多的流行的构建工具的，因此您不用担心夸平台的问题。具体可以查阅[unplugin-ast文档](https://unplugin.unjs.io/showcase/unplugin-ast.html#installation)。

下一步是在构建工具中通过 `unplugin-ast` 插件添加 `autoImportTransformer`。这里以[rollup](https://rollupjs.org/)为例：

```js
// rollup.config.mjs

// 1. 导入unplugin-ast的rollup插件
import AST from "unplugin-ast/rollup"
// 2.导入domtify提供的autoImportTransformer
import { autoImportTransformer } from "@domtify/auto-import-transformer"

export default {
  plugins: [
    AST({
      transformer: [autoImportTransformer()],
    }),
  ],
}
```

接下来，就可以清理掉之前手动导入的方法和助手就像下面这样代码会保持清洁。

```js
// 导入核心
import d from "domtify"

export const resize = (el) => {
  d(el)
    .addClass("foo")
    .resize(
      d.debounce(() => {
        console.log("元素尺寸发生了改变")
      }, 150),
    )
}
```

当您使用`rollup`打包时会自动导入您用到的方法和助手。

## 下一步

接下来,您可以查看更多的[方法](/reference/method-get)和[助手](/reference/utilities-extend)
