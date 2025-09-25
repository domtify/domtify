# .wrap()

## .wrap( wrappingElement )

- **返回:** [domtify](/reference/Types#domtify)

用 HTML 结构包裹匹配元素集中的每个元素。

### .wrap( wrappingElement ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **wrappingElement**
  - **类型:** [Selector](/reference/Types#selector) | [htmlString](/reference/Types#htmlstring) | [Element](/reference/Types#element) | [domtify](/reference/Types#domtify)
  - **描述:** 一个选择器、元素、HTML 字符串或 domtify 对象，用于指定要围绕匹配元素包装的结构。当你传递包含多个元素的 domtify 集合，或匹配多个元素的选择器时，将使用第一个元素。

### .wrap( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index ) => [String](/reference/Types#string) | [domtify](/reference/Types#domtify)
  - **描述:** 一个回调函数，返回要围绕匹配元素包装的 HTML 内容或 domtify 对象。接收元素在集合中的索引位置作为参数。在函数内部，`this` 指向集合中的当前元素。

让集合中的元素被传入的元素包裹

例子：

```html
<div class="container">
  <div class="inner">Hello</div>
  <div class="inner">Goodbye</div>
</div>
```

使用`.wrap()`，我们可以在内部元素周围插入 HTML 结构，`<div>`如下所示：

```js
d(".inner").wrap("<div class='new'></div>")
```

新`<div>`元素会即时创建并添加到 DOM 中。结果是`<div>`每个匹配的元素都被包裹在一个新的元素中：

```html
<div class="container">
  <div class="new">
    <div class="inner">Hello</div>
  </div>
  <div class="new">
    <div class="inner">Goodbye</div>
  </div>
</div>
```
