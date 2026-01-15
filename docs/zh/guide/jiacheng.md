## 为什么 domtify 不采用 jQuery 式的链式调用？

domtify 并不是一个 jQuery 的替代实现，而是一个**以函数组合（composition）为核心的现代 DOM 工具库**。

虽然 jQuery 式的链式调用在语法上非常简洁，但它依赖的是一套**基于实例和隐式状态的模型**，这与 domtify 的核心设计目标并不一致。

### domtify 的核心模型

在 domtify 中，每一个 DOM 操作都是一个函数：

```ts
(...args) =>
  (elements) =>
    newElements | value;
```

这意味着：

- DOM 数据在函数之间**显式流动**
- 没有 `this`、没有隐藏状态
- 没有类实例的语义负担
- 每个方法都可以被**单独导入和 tree-shaking**

```ts
pipe(
  dom("#box"),
  addClass("active"),
  css("color", "red"),
  find("span"),
  text()
);
```

`pipe` 只是把「链式调用」变成了**显式的数据流**。

---

### jQuery 链式调用的代价

jQuery 的链式 API 建立在以下前提之上：

- 所有操作都围绕一个**可变的包装对象**
- 方法依赖 `this`
- 返回值需要为“是否继续链式”做特殊处理
- DOM 集合的合并、筛选、变换都发生在实例内部

这种模型在当年非常成功，但它也带来了几个无法回避的问题：

- **难以 tree-shaking**
- **中间状态不可观察**
- **调试必须打断链式调用**
- **API 行为高度依赖约定**

这些问题在现代构建工具和模块化环境中会被进一步放大。

---

### 为什么不同时支持两种模式？

从技术上讲，domtify 可以提供一个 jQuery 风格的链式包装层。

但这样做意味着：

- 需要维护两套不同的 API 心智模型
- 链式层无法做到与核心函数 API 完全一致
- 核心设计会被迫为链式语义妥协
- 文档和类型系统的复杂度显著上升

与其提供一个「看起来像 jQuery，但行为并不完全一致」的链式 API，
domtify 选择只维护**一套清晰、可预测、可组合的函数式模型**。

---

### 对 jQuery 用户的说明

如果你熟悉 jQuery：

```js
$("#box").addClass("active").find("span").text();
```

在 domtify 中对应的是：

```ts
pipe(dom("#box"), addClass("active"), find("span"), text());
```

它们表达的是**同一件事**，只是数据流变得更加显式。

---

### 设计哲学

> **显式的数据流，
> 可组合的函数，
> 最小的抽象成本。**

这是 domtify 选择 `pipe` 而不是 jQuery 式链式调用的原因。
