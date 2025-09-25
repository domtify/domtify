# .prepend()

## .prepend( content [, content ] )

- **返回:** [domtify](/reference/Types#domtify)

插入到元素内部的开头(第一个子元素)。

### .prepend( content [, content ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **content**
  - **类型:** [htmlString](/reference/Types#htmlstring)|[Element](/reference/Types#element)|[Text](/reference/Types#text)|[Array](/reference/Types#array)|[domtify](/reference/Types#domtify)
  - **描述:** DOM 元素、文本节点、元素和文本节点数组、HTML 字符串或 jQuery 对象，插入到匹配元素集的每个元素的开头。
- **content**
  - **类型:** [htmlString](/reference/Types#htmlstring)|[Element](/reference/Types#element)|[Text](/reference/Types#text)|[Array](/reference/Types#array)|[domtify](/reference/Types#domtify)
  - **描述:** 一个或多个DOM 元素、文本节点、元素和文本节点数组、HTML 字符串或 jQuery 对象，插入到匹配元素集的每个元素的开头。

### .prepend( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [String](/reference/Types#string) html ) => [htmlString](/reference/Types#htmlstring)|[Element](/reference/Types#element)|[Text](/reference/Types#text)|[domtify](/reference/Types#domtify)
  - **描述:** 返回 HTML 字符串、DOM 元素、文本节点或 domtify 对象，用于插入到匹配元素集合中每个元素的开头。接收元素在集合中的索引位置和元素的旧 HTML 值作为参数。在函数内部，`this`引用集合中的当前元素。

该`.prepend()`方法将指定的内容插入为 domtify 集合中每个元素的第一个子元素。

想象以下html片段：

```html
<h2>Greetings</h2>
<div class="container">
  <div class="inner">Hello</div>
  <div class="inner">Goodbye</div>
</div>
```

您可以创建内容并将其一次插入到多个元素中：

```js
d(".inner").prepend("<p>Test</p>")
```

每个内部`<div>`元素都会获得以下新内容：

```html
<h2>Greetings</h2>
<div class="container">
  <div class="inner">
    <p>Test</p>
    Hello
  </div>
  <div class="inner">
    <p>Test</p>
    Goodbye
  </div>
</div>
```
