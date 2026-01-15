# 快速入门

## 在线尝试

可以直接在 StackBlitz 上进行在线尝试。

## 安装

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

## 基本用法

:::tabs
== ES Modules

```js
import { dom, pipe, addClass, css, find, text,trace } from "domtify";
import { debounce } from "domtify/util";


const spanText = pipe(
  dom("#box"),
  addClass("active"),
  trace("addClass之后:"), // trace方法打印管道此处位置的dom数据
  css("color", "red"),
  find("span"),
  text()
);

pipe(
  dom(window),
  on("resize", debounce(()=>{...},300))
);
```

== IIFE

```js
const { dom, pipe, addClass, css, find, text, trace, util, on } = domtify;
const { debounce } = util;
const spanText = pipe(
  dom("#box"),
  addClass("active"),
  trace("addClass之后:"), // trace方法打印管道此处位置的dom数据
  css("color", "red"),
  find("span"),
  text()
);

pipe(
  dom(window),
  on(
    "resize",
    debounce(() => {
      console.log("rew");
    }, 300)
  )
);
```

:::
