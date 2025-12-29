# 拓展

domtify也可以拓展你自己的方法

## 浏览器用户

这里有一个简单的示例,拓展一个`highlight`链式方法

```js
d.fn.highlight = function (color = "yellow") {
  this.each((index, el) => {
    el.style.backgroundColor = color
  })
  // 返回this用于链式
  return this
}

// 使用
d("li").highlight("blue").text("foo bar")
```

## 工程化用户

只需要定义一个高阶函数。

```js
import { dom, pipe, text } from "domtify"

const highlight =
  (color = "yellow") =>
  (els) => {
    for (const el of els) {
      el.style.backgroundColor = color
    }
    // 返回数组用于管道(如果后面没有调用其它方法可以随意返回任意值)
    return els
  }

pipe(dom("li"), highlight("blue"), text("foo bar"))
```
