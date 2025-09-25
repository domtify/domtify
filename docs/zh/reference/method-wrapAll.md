# .wrapAll()

## .wrapAll( wrappingElement )

- **返回:** [domtify](/reference/Types#domtify)

用 HTML 结构包裹匹配元素集合中的所有元素。

### .wrapAll( wrappingElement ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **wrappingElement**
  - **类型:** [Selector](/reference/Types#selector) | [htmlString](/reference/Types#htmlstring) | [Element](/reference/Types#element) | [domtify](/reference/Types#domtify)
  - **描述:** 选择器、元素、HTML 字符串或 jQuery 对象指定包裹匹配元素的结构。

### .wrapAll( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index ) => [String](/reference/Types#string) | [domtify](/reference/Types#domtify)
  - **描述:** 一个回调函数，用于返回 HTML 内容或 domtify 对象，以包装所有匹配的元素。在函数内部，`this`它引用集合中的第一个元素。

该`.wrapAll()`函数可以接受任何可以传递给`d()`函数的字符串或对象来指定 DOM 结构。该结构可以嵌套多层，但只能包含一个最内层元素。该结构将以单个组的形式包裹匹配元素集合中的所有元素。

例子：

考虑以下 HTML：

```html
<div class="container">
  <div class="inner">Hello</div>
  <div class="inner">Goodbye</div>
</div>
```

使用`.wrapAll()`，我们可以在内部元素周围插入 HTML 结构，`<div>`如下所示：

```js
d(".inner").wrapAll("<div class='new' />")
```

新`<div>`元素会即时创建并添加到 DOM 中。结果是一个`<div>`包裹所有匹配元素的新元素：

```html
<div class="container">
  <div class="new">
    <div class="inner">Hello</div>
    <div class="inner">Goodbye</div>
  </div>
</div>
```
