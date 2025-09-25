# .after()

## .after( content [, content ] )

- **返回:** [domtify](/reference/Types#domtify)

在元素后插入内容

### .after( content [, content ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **content**
  - **类型:** [htmlString](/reference/Types#htmlstring) | [Element](/reference/Types#element) | [Text](/reference/Types#text) | [Array](/reference/Types#array) | [domtify](/reference/Types#domtify)
  - **描述:** HTML 字符串、DOM 元素、文本节点、元素和文本节点数组或 domtify 对象，插入到匹配元素集中的每个元素之后。
- **content**
  - **类型:** [htmlString](/reference/Types#htmlstring) | [Element](/reference/Types#element) | [Text](/reference/Types#text) | [Array](/reference/Types#array) | [domtify](/reference/Types#domtify)
  - **描述:** 要在匹配元素集的每个元素后插入一个或多个额外的 DOM 元素、文本节点、元素和文本节点数组、HTML 字符串或 domtify 对象。

### .after( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index) => [htmlString](/reference/Types#htmlstring) | [Element](/reference/Types#element) | [Text](/reference/Types#text) | [domtify](/reference/Types#domtify)
  - **描述:** 返回 HTML 字符串、DOM 元素、文本节点或 domtify 对象，用于插入到匹配元素集合中每个元素之后。该函数接收元素在集合中的索引位置作为参数。在函数内部，`this`引用集合中的当前元素。

### .after( function-html ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function-html**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index,[String](/reference/Types#string) html) => [htmlString](/reference/Types#htmlstring) | [Element](/reference/Types#element) | [Text](/reference/Types#text) | [domtify](/reference/Types#domtify)
  - **描述:** 返回 HTML 字符串、DOM 元素、文本节点或 domtify 对象，用于插入到匹配元素集合中每个元素之后。接收元素在集合中的索引位置和元素的旧 HTML 值作为参数。在函数内部，`this`引用集合中的当前元素。

`.after()`和[.insertAfter()](/reference/method-insertAfter)方法执行相同的任务。简单理解就是内容和目标的位置。使用 时`.after()`，要插入的内容来自方法的参数。

例子：

```html
<div class="container">
  <h2>Greetings</h2>
  <div class="inner">Hello</div>
  <div class="inner">Goodbye</div>
</div>
```

可以创建内容然后一次插入到多个元素之后：

```js
d(".inner").after("<p>Test</p>")
```

每个内部`<div>`元素都会获得以下新内容：

```html
<div class="container">
  <h2>Greetings</h2>
  <div class="inner">Hello</div>
  <p>Test</p>
  <div class="inner">Goodbye</div>
  <p>Test</p>
</div>
```

也可以选择 DOM 中的一个元素并将其插入到另一个元素之后：

```js
d(".container").after($("h2"))
```

如果以这种方式选择的元素被插入到 DOM 中其他位置的单个位置，它将被移动而不是克隆：

```html
<div class="container">
  <div class="inner">Hello</div>
  <div class="inner">Goodbye</div>
</div>
<h2>Greetings</h2>
```
