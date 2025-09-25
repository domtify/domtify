# .text()

获取匹配元素集合中每个元素的组合文本内容，包括其后代元素，或设置匹配元素的文本内容。

## .text()

- **返回:** [String](/reference/Types#string)

获取匹配元素集合中每个元素的组合文本内容，包括其后代元素。

### .text() <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **该方法不接受任何参数**

与`.html()`方法不同，`.text()`方法可以在XML和HTML文档中使用。`.text()`方法的结果是一个包含所有匹配元素组合文本的字符串。（由于不同浏览器中HTML解析器的差异，返回的文本在换行符和其他空白字符方面可能有所不同。）考虑以下HTML：

```html
<div class="demo-container">
  <div class="demo-box">Demonstration Box</div>
  <ul>
    <li>list item 1</li>
    <li>list <strong>item</strong> 2</li>
  </ul>
</div>
```

代码`d( "div.demo-container" ).text()`会产生以下结果：

```text
Demonstration Box list item 1 list item 2
```

`.text()`方法不应该用于表单输入或脚本。要设置或获取`input`或`textarea`元素的文本值，请使用`.val()`方法。要获取script元素的值，请使用`.html()`方法。

## .text( text )

- **返回:** [domtify](/reference/Types#domtify)

将匹配元素集合中每个元素的内容设置为指定的文本。

### .text( text ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **text**
  - **类型:** [String](/reference/Types#string) 或 [Number](/reference/Types#number) 或 [Boolean](/reference/Types#boolean)
  - **描述:** 要设置为每个匹配元素内容的文本。当提供Number或Boolean时，它将被转换为字符串表示形式。

### .text( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [String](/reference/Types#string) text ) => [String](/reference/Types#string)
  - **描述:** 一个返回要设置的文本内容的函数。接收元素在集合中的索引位置和旧文本值作为参数。

与`.html()`方法不同，`.text()`方法可以在XML和HTML文档中使用。

我们需要意识到，此方法会根据需要对提供的字符串进行转义，以便在HTML中正确渲染。为此，它调用DOM方法`.createTextNode()`，不会将字符串解释为HTML。考虑以下HTML：

```html
<div class="demo-container">
  <div class="demo-box">Demonstration Box</div>
  <ul>
    <li>list item 1</li>
    <li>list <strong>item</strong> 2</li>
  </ul>
</div>
```

代码`d( "div.demo-container" ).text( "<p>This is a test.</p>" );`将产生以下DOM输出：

```text
<div class="demo-container">
  &lt;p&gt;This is a test.&lt;/p&gt;
</div>
```

它将在渲染页面上显示，就像标签被暴露一样，像这样：

```html
<p>This is a test</p>
```

`.text()`方法不应该用于`input`元素。对于输入字段文本，请使用`.val()`方法。

```js
$("ul li").text(function (index) {
  return "item number " + (index + 1)
})
```

给定一个包含三个`<li>`元素的无序列表，此示例将产生以下DOM输出：

```html
<ul>
  <li>item number 1</li>
  <li>item number 2</li>
  <li>item number 3</li>
</ul>
```
