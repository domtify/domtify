# on

## .on( events [, selector ] , handler [, options ] )

- **返回:** [domtify](/reference/Types#domtify)

给匹配集合中的元素批量的绑定事件。

### .on( events [, selector ] , handler [, options ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **events**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 一个或多个以空格或逗号分隔的事件类型和可选命名空间，例如：`"click"`、`"keydown.myPlugin"`。
- **selector**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 事件委托所用,触发事件的子元素过滤选择器
- **handler**
  - **类型:** [Function](/reference/Types#function)( [Event](/reference/Types#event) eventObject [, [Anything](/reference/Types#anything) extraParameter ] [, ... ] )
  - **描述:** 事件触发时执行的函数。
- **options**
  - **类型:** [PlainObject](/reference/Types#plainobject)| [Boolean](/reference/Types#boolean)
  - **描述:** 可以是boolean值也可以是一个`options`对象,默认为`false`表示冒泡

    ```js
    {
      // true:该类型的事件捕获阶段传播到该 EventTarget 时触发
      "capture": false,
      // 默认值为 false, 如果为 true: listener 会在其被调用之后自动移除
      "once": false,
      // 默认值为 false，如果为 true 表示 listener 永远不会调用 preventDefault(),如果强行调用控制台会有警告
      "passive": false
      // 可传入 AbortSignal，当 signal 被 abort() 时移除监听器。
      "signal":null
    }

    ```

## 上下文和事件属性及方法

| jQuery                  | domtify                 | 说明                              |
| ----------------------- | ----------------------- | --------------------------------- |
| this                    | this                    | 当前触发事件的 DOM 元素           |
| event.target            | event.target            | 最初调度事件的元素                |
| event.delegateTarget    | event.delegateTarget    | 绑定事件处理函数的元素            |
| event.currentTarget     | event.currentTarget     | 当前触发事件的 DOM 元素与this相同 |
| event.stopPropagation() | event.stopPropagation() | 阻止事件进一步传递                |
| event.preventDefault()  | event.preventDefault()  | 阻止事件默认行为                  |

> [!TIP]
> 完全保持了和jQuery相同的行为

## 用法

假定有下面这样一段HTML：

```html
<ul>
  <li id="foo">foo</li>
  <li id="bar">bar</li>
</ul>
```

### 基础监听

```js
d("#foo").on("click", function () {
  console.log("clicked!")
})
```

### 事件委托

```js
d("ul").on("click", "li", function () {
  console.log("clicked!")
})
```

### 捕获

```js
d("#foo").on(
  "click",
  function () {
    console.log("clicked!")
  },
  true,
)

// 委托也支持捕获
d("ul").on(
  "click",
  "li",
  function () {
    console.log("clicked!")
  },
  true,
)

// 显示传入capture配置项
d("ul").on(
  "click",
  "li",
  function () {
    console.log("clicked!")
  },
  { capture: true },
)
```

### once选项等同于.one方法

```js
d("ul").on(
  "click",
  "li",
  function () {
    console.log("clicked!")
  },
  { capture: true, once: true },
)
```

### 可被 AbortSignal 移除

```js
const controller = new AbortController()
d("ul").on(
  "click",
  "li",
  function () {
    console.log("clicked!")
  },
  { signal: controller.signal },
)

controller.abort() // 方法被调用时自动移除监听器
```

### passive选项设置让监听器中不支持调用preventDefault()

```js
d("ul").on(
  "click",
  function (event) {
    console.log("this is ul click!")
    event.preventDefault() // 强行调用控制台会有一个错误提示
  },
  { passive: true },
)
```

### 命名空间

```js
d("#foo").on("click.ns1", function () {
  console.log("clicked!")
})
```

### 批量绑定,使用空格或者逗号分隔

```js
d("#foo").on("click click.ns1 mousedown.ns1", handler)
```
