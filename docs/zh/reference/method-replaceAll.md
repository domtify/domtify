# .replaceAll()

## .replaceAll( target )

- **返回:** [domtify](/reference/Types#domtify)

用匹配的元素集合替换每个目标元素。

### .replaceAll( target ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **target**
  - **类型:** [Selector](/reference/Types#selector)|[domtify](/reference/Types#domtify)|[Array](/reference/Types#array)|[Element](/reference/Types#element)
  - **描述:** 选择器字符串、domtify 对象、DOM 元素或元素数组，指示要替换的元素。

`.replaceAll()` 方法与 [.replaceWith()](/reference/method-replaceWith) 类似，但它们的源和目标是相反的。

例子：
考虑有以下html结构：

```html
<div class="container">
  <div class="inner first">Hello</div>
  <div class="inner second">And</div>
  <div class="inner third">Goodbye</div>
</div>
```

我们可以创建一个元素，然后用它替换其他元素：

```js
d("<h2>New heading</h2>").replaceAll(".inner")
```

这会导致它们全部被替换：

```html
<div class="container">
  <h2>New heading</h2>
  <h2>New heading</h2>
  <h2>New heading</h2>
</div>
```

或者，我们可以选择一个元素作为替换：

```js
d(".first").replaceAll(".third")
```

其结果是 DOM 结构：

```html
<div class="container">
  <div class="inner second">And</div>
  <div class="inner first">Hello</div>
</div>
```
