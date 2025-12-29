# 快速入门

只是使用方式上有的一点不同,但是方法的作用还是一样的,主要是从传统链式到管道的一个思想转变。

## 基本示例

```js
import { dom as $, pipe, addClass, css, find, text } from "domtify"

pipe(
  $("#box"),
  addClass("active"),
  css("color", "red"),
  find("span"),
  text("Hello domtify"),
)

// 作用和下面jQuery写法相同

// $("#box")
//   .addClass("active")
//   .css("color", "red")
//   .find("span")
//   .text("Hello jQuery")
```

## 助手函数的使用

```js
import { extend, getIn, setIn, debounce } from "domtify/util"

// 基本使用
window.addEventListener("resize", debounce(()=>{...},300))
```

## 调试

```js
import { dom as $, pipe, addClass, css, find, text, trace } from "domtify"

pipe(
  $("#box"),
  addClass("active"),
  trace("addClass之后:"), // trace方法支持您传入一个描述
  css("color", "red"),
  find("span"),
  trace("text之前:"), // 打印当前所有的span元素
  text("Hello domtify"),
)
```
