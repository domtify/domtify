# .wrapInner()

## .wrapInner( wrappingElement )

- **返回:** [domtify](/reference/Types#domtify)

用 HTML 结构包裹匹配元素集合中每个元素的内容。

### .wrapInner( wrappingElement ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **wrappingElement**
  - **类型:** [Selector](/reference/Types#selector) | [htmlString](/reference/Types#htmlstring) | [Element](/reference/Types#element) | [domtify](/reference/Types#domtify)
  - **描述:** HTML 代码片段、选择器表达式、jQuery 对象或 DOM 元素，指定包裹匹配元素内容的结构。

### .wrapInner( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index ) => [String](/reference/Types#string)
  - **描述:** 一个回调函数，用于生成一个结构体来包裹匹配元素的内容。该函数接收集合中元素的索引位置作为参数。在函数内部，`this`引用集合中的当前元素。

该`.wrapInner()`函数可以接受任何可以传递给`d()`工厂函数的字符串或对象来指定 DOM 结构。该结构可以嵌套多层，但只能包含一个最内层元素。该结构将包裹匹配元素集合中每个元素的内容。

例子：
考虑以下 HTML：

```html
<div class="container">
  <div class="inner">Hello</div>
  <div class="inner">Goodbye</div>
</div>
```

使用`.wrapInner()`，我们可以在每个内部元素的内容周围插入一个 HTML 结构，`<div>`如下所示：

```js
d(".inner").wrapInner("<div class='new'></div>")
```

新`<div>`元素会即时创建并添加到 DOM 中。结果会`<div>`包裹住每个匹配元素的内容：

```html
<div class="container">
  <div class="inner">
    <div class="new">Hello</div>
  </div>
  <div class="inner">
    <div class="new">Goodbye</div>
  </div>
</div>
```
