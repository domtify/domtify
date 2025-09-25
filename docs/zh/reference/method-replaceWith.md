# .replaceWith()

## .replaceWith( newContent )

- **返回:** [domtify](/reference/Types#domtify)

将匹配元素集合中的每个元素替换为提供的新内容，并返回被移除的元素集合。

### .replaceWith( newContent) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **newContent**
  - **类型:** [htmlString](/reference/Types#htmlstring) | [Element](/reference/Types#element)| [Array](/reference/Types#array)| [domtify](/reference/Types#domtify)
  - **描述:** 要插入的内容。可以是 HTML 字符串、DOM 元素、DOM 元素数组或 domtify 对象。

### .replaceWith( function) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [String](/reference/Types#string) currentTextContent ) => [htmlString](/reference/Types#htmlstring) | [Element](/reference/Types#element)| [Array](/reference/Types#array)| [domtify](/reference/Types#domtify)
  - **描述:** 返回用于替换匹配元素集的内容的函数。`this` 是当前的元素。

例子：

想象页面有以下html：

```html
<div class="container">
  <div class="inner first">Hello</div>
  <div class="inner second">And</div>
  <div class="inner third">Goodbye</div>
</div>
```

替换第二个div内容：

```js
d("div.second").replaceWith("<h2>New heading</h2>")
```

新的结构如下：

```html
<div class="container">
  <div class="inner first">Hello</div>
  <h2>New heading</h2>
  <div class="inner third">Goodbye</div>
</div>
```
