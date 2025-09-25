# .html()

## .html()

- **返回:** [String](/reference/Types#string)

获取匹配元素集合中第一个元素的 HTML 内容。

### .html() <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **该方法不需要任何参数**

此方法在XML文档中不可用。

在HTML文档中，`.html()`可用于获取任何元素的内容。如果选择器表达式匹配多个元素，只有第一个匹配项的HTML内容会被返回。考虑这段代码：

```js
d("div.demo-container").html()
```

为了检索以下`<div>`的内容，它必须是文档中第一个具有`class="demo-container"`的元素：

```html
<div class="demo-container">
  <div class="demo-box">Demonstration Box</div>
</div>
```

结果将如下所示：

```html
<div class="demo-box">Demonstration Box</div>
```

此方法使用浏览器的`innerHTML`属性。

## .html( htmlString )

- **返回:** [domtify](/reference/Types#domtify)

设置匹配元素集合中每个元素的 HTML 内容。

### .html( htmlString ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **htmlString**
  - **类型:** [htmlString](/reference/Types#htmlstring)
  - **描述:** 要设置为每个匹配元素内容的HTML字符串。

### .html( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [String](/reference/Types#string) oldhtml ) => [htmlString](/reference/Types#htmlstring)
  - **描述:** 一个返回要设置的HTML内容的函数。接收集合中元素的索引位置和旧的HTML值作为参数。domtify在调用函数之前会清空元素；使用oldhtml参数来引用之前的内容。在函数内部，`this`指向集合中的当前元素。

`.html()`方法在XML文档中不可用。

当`.html()`用于设置元素的内容时，该元素中的任何内容都会被新内容完全替换
