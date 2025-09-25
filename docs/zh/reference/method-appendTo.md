# .appendTo()

## .appendTo( target )

- **返回:** [domtify](/reference/Types#domtify)

将匹配元素集合中的每个元素插入到目标的末尾

### .appendTo( target ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **target**
  - **类型:** [Selector](/reference/Types#selector)|[htmlString](/reference/Types#htmlstring)|[Element](/reference/Types#element)|[Array](/reference/Types#array)|[domtify](/reference/Types#domtify)
  - **描述:** 选择器、元素、HTML 字符串、元素数组或 domtify 对象匹配的元素集将插入到此参数指定的元素的末尾。

[.append()](/reference/method-append)和方法`.appendTo()`执行相同的任务。主要区别在于语法——具体来说，内容和目标的位置。

想象以下 HTML：

```html
<h2>Greetings</h2>
<div class="container">
  <div class="inner">Hello</div>
  <div class="inner">Goodbye</div>
</div>
```

我们可以创建内容并将其一次插入到多个元素中：

```js
d("<p>Test</p>").appendTo(".inner")
```

每个内部`<div>`元素都会获得以下新内容：

```html
<h2>Greetings</h2>
<div class="container">
  <div class="inner">
    Hello
    <p>Test</p>
  </div>
  <div class="inner">
    Goodbye
    <p>Test</p>
  </div>
</div>
```
