# Pipe 新手教程（3 分钟上手）

> 如果你会用 jQuery / 原生 DOM，
> 那你已经会用 domtify 的 `pipe` 了。

---

## 1️⃣ 什么是 `pipe`？

**`pipe` 就是“把 DOM 操作按顺序写出来”**

```ts
pipe(a, b, c);
```

等价于：

```ts
c(b(a));
```

在 domtify 里：

- 第一步：选中 DOM
- 后面的每一步：在 DOM 上做一件事

---

## 2️⃣ 第一个例子

```ts
import { pipe, dom, addClass, css } from "domtify";

pipe(dom("#box"), addClass("active"), css("color", "red"));
```

读法非常直觉：

> 选中 `#box` → 加 class → 改样式

**从上往下读，就是执行顺序。**

---

## 3️⃣ 和 jQuery 的对照（帮助理解）

```js
// jQuery
$("#box").addClass("active").css("color", "red");
```

```ts
// domtify
pipe(dom("#box"), addClass("active"), css("color", "red"));
```

区别只有一个：

> domtify 把「链」写成了「一条清晰的步骤列表」

---

## 4️⃣ 每一步都只做一件事

domtify 中的每个方法都是：

```ts
“接收当前 DOM → 返回新的 DOM（或值）”
```

例如：

```ts
find("span"); // 只负责查找
text(); // 只负责读取/设置文本
addClass(); // 只负责 class
```

你可以**随意组合**它们：

```ts
pipe(dom("#box"), find("span"), addClass("highlight"));
```

---

## 5️⃣ 在任何位置调试（trace）

如果你想知道**中间发生了什么**：

```ts
import { trace } from "domtify";

pipe(
  dom("#box"),
  addClass("active"),
  trace("addClass 之后"),
  find("span"),
  trace("find span 之后"),
  text()
);
```

`trace` 不会改变结果，只会帮你打印当前 DOM。

> 不需要打断执行，也不需要拆链。

---

## 6️⃣ 事件也是 pipe

```ts
import { on } from "domtify";
import { debounce } from "domtify/util";

pipe(
  dom(window),
  on(
    "resize",
    debounce(() => {
      console.log("resize");
    }, 300)
  )
);
```

读法依然是：

> 选中 window → 监听 resize

---

## 7️⃣ pipe 不是“高级函数式”

你不需要了解：

- monad
- curry
- category theory

你只需要记住一句话：

> **pipe = 把 DOM 操作按顺序写清楚**

---

## 8️⃣ 推荐用法（记住这 3 条就够了）

✅ 第一步永远是 `dom(...)`
✅ 每一步只做一件事
✅ 从上往下读代码

---

## 9️⃣ 一个完整的小例子

```ts
pipe(
  dom("#list"),
  find("li"),
  addClass("item"),
  css("cursor", "pointer"),
  on("click", (e) => {
    console.log(e.target);
  })
);
```

**没有隐藏状态，没有魔法。**

---

## 总结

> jQuery 的链式调用 = 隐式的数据流
> domtify 的 `pipe` = 显式的数据流

一旦你习惯了 `pipe`，
你会发现它更容易读、更容易调试，也更容易维护。
