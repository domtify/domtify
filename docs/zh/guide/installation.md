# 安装

domtify针对不同的用户提供了不同的使用方式,根据您的情况选择。

## 包管理器

该安装方式适用于 domtify 仅作为内部实现细节存在，最终以打包后的工程化产物形式交付给用户。

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

然后你可以把它导入到您的项目中。

```js
// 按需导入单个方法
import { … } from 'domtify';

// 使用通配符导入
import * as d from 'domtify';

```

[快速入门](/guide/quick-start)查看更详细的信息

## CDN

domtify也支持直接在页面中引入，就像您以前引入jQuery一样。

```html
<script src="https://unpkg.com/domtify@latest/dist/domtify.min.js"></script>
<!-- or -->
<script src="https://cdn.jsdelivr.net/npm/domtify@latest/dist/domtify.min.js"></script>
```

接下来您就像往常使用 jQuery 一样使用 domtify,只不过是把`$`替换成`d`。

## 下一步

接下来,您可以查看更多的[方法](/reference/method-get)和[助手](/reference/utilities-extend)
