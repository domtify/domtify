# .before()

## .before( content [, content ] )

- **返回:** [domtify](/reference/Types#domtify)

在元素之前插入内容

### .before( content [, content ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **content**
  - **类型:** [htmlString](/reference/Types#htmlstring) | [Element](/reference/Types#element) | [Text](/reference/Types#text) | [Array](/reference/Types#array) | [domtify](/reference/Types#domtify)
  - **描述:** HTML 字符串、DOM 元素、文本节点、元素和文本节点数组或 domtify 对象，插入到匹配元素集中的每个元素之前。
- **content**
  - **类型:** [htmlString](/reference/Types#htmlstring) | [Element](/reference/Types#element) | [Text](/reference/Types#text) | [Array](/reference/Types#array) | [domtify](/reference/Types#domtify)
  - **描述:** 要在匹配元素集的每个元素前插入一个或多个额外的 DOM 元素、文本节点、元素和文本节点数组、HTML 字符串或 domtify 对象。

### .before( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index) => [htmlString](/reference/Types#htmlstring) | [Element](/reference/Types#element) | [Text](/reference/Types#text) | [domtify](/reference/Types#domtify)
  - **描述:** 返回 HTML 字符串、DOM 元素、文本节点或 domtify 对象，用于插入到匹配元素集合中每个元素之前。该函数接收元素在集合中的索引位置作为参数。在函数内部，`this`引用集合中的当前元素。

### .before( function-html ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function-html**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index,[String](/reference/Types#string) html) => [htmlString](/reference/Types#htmlstring) | [Element](/reference/Types#element) | [Text](/reference/Types#text) | [domtify](/reference/Types#domtify)
  - **描述:** 返回 HTML 字符串、DOM 元素、文本节点或 domtify 对象，用于插入到匹配元素集合中每个元素之前。接收元素在集合中的索引位置和元素的旧 HTML 值作为参数。在函数内部，`this`引用集合中的当前元素。

`.before()`和[.insertBefore()](/reference/method-insertBefore)方法执行相同的任务。主要区别在于语法,简单理解就是内容和目标的位置。使用 时`.before()`，要插入的内容来自方法的参数。

例子：

```html
<div class="container">
  <h2>Greetings</h2>
  <div class="inner">Hello</div>
  <div class="inner">Goodbye</div>
</div>
```

可以创建内容然后一次插入到多个元素之前：

```js
d(".inner").before("<p>Test</p>")
```

每个内部`<div>`元素都会获得以下新内容：

```html
<div class="container">
  <h2>Greetings</h2>
  <p>Test</p>
  <div class="inner">Hello</div>
  <p>Test</p>
  <div class="inner">Goodbye</div>
</div>
```
