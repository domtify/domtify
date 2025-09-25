# .add()

## .add( selector )

- **返回:** [domtify](/reference/Types#domtify)

添加新的元素到匹配元素集合中。

### .add( selector ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 一个表示选择器表达式的字符串，用于查找要添加到匹配元素集合中的其他元素。

### .add( elements ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **elements**
  - **类型:** [Element](/reference/Types#element)
  - **描述:** 一个要添加到匹配元素集合中的元素。

### .add( html ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **html**
  - **类型:** [htmlString](/reference/Types#htmlstring)
  - **描述:** 一个要添加到匹配元素集合中的HTML片段。

### .add( selection ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selection**
  - **类型:** [domtify](/reference/Types#domtify)
  - **描述:** 一个要添加到匹配元素集合中的现有domtify对象。

### .add( selector, context ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 一个表示选择器表达式的字符串，用于查找要添加到匹配元素集合中的其他元素。
- **context**
  - **类型:** [Element](/reference/Types#element)
  - **描述:** 文档中选择器应该开始匹配的点；类似于`d(selector, context)`方法的`context`参数。

往现有集合里添加新的元素

例子:

```js
d("li").add("p").css("background-color", "red")
//或者
d("li")
  .add(document.getElementsByTagName("p")[0])
  .css("background-color", "red")
```

此调用的结果是所有四个元素后面都有红色背景。

```js
d("li").add("<p id='new'>new paragraph</p>").css("background-color", "red")
```

虽然新段落已被创建并且其背景颜色已更改，但它仍然不会出现在页面上。要将其放置在页面上，我们可以向链中添加一个插入方法。
