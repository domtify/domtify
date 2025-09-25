# .insertBefore()

## .insertBefore( target )

- **返回:** [domtify](/reference/Types#domtify)

将匹配元素集合中的每个元素插入目标之前。

### .insertBefore( target ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **target**
  - **类型:** [Selector](/reference/Types#selector) |[htmlString](/reference/Types#htmlstring) | [Element](/reference/Types#element) | [Array](/reference/Types#array) | [domtify](/reference/Types#domtify)
  - **描述:** 选择器、元素、元素数组、HTML 字符串或 jQuery 对象；匹配的元素集将插入此参数指定的元素之前。

[.before()](/reference/method-before)和`.insertbefore()`方法执行相同的任务。主要区别在于语法,简单理解就是内容和目标的位置。

想象有以下html片段

```html
<div class="container">
  <h2>Greetings</h2>
  <div class="inner">Hello</div>
  <div class="inner">Goodbye</div>
</div>
```

我们可以创建内容并将其一次插入到多个元素之前：

```js
d("<p>Test</p>").insertBefore(".inner")
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
