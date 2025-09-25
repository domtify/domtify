# .clone()

## .clone( [withDataAndEvents ] )

- **返回:** [domtify](/reference/Types#domtify)

创建匹配元素集的克隆副本。

### .clone( [withDataAndEvents ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **withDataAndEvents(default: false)**
  - **类型:** [Boolean](/reference/Types#boolean)
  - **描述:** 克隆元素时是否同时克隆数据和事件

### .clone( [withDataAndEvents ] [, deepWithDataAndEvents ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **withDataAndEvents(default: false)**
  - **类型:** [Boolean](/reference/Types#boolean)
  - **描述:** 克隆元素时是否同时克隆数据和事件
- **deepWithDataAndEvents(default: false)**
  - **类型:** [Boolean](/reference/Types#boolean)
  - **描述:** 克隆元素时是否同时克隆子元素的数据和事件

例子：

想象以下html代码片段:

```html
<div class="container">
  <div class="hello">Hello</div>
  <div class="goodbye">Goodbye</div>
</div>
```

通常使用[.append()](/reference/method-append)方法将一个元素插入到 DOM 中的某个位置时，它会从原来的位置移动。

```js
d(".hello").appendTo(".goodbye")
```

最终的 DOM 结构如下：

```html
<div class="container">
  <div class="goodbye">
    Goodbye
    <div class="hello">Hello</div>
  </div>
</div>
```

为了防止这种情况并创建元素的副本，您可以编写以下内容：

```js
d(".hello").clone().appendTo(".goodbye")
```

这将产生：

```html
<div class="container">
  <div class="hello">Hello</div>
  <div class="goodbye">
    Goodbye
    <div class="hello">Hello</div>
  </div>
</div>
```
