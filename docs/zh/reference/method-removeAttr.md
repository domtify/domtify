# .removeAttr()

## .removeAttr( attributeName )

- **返回:** [domtify](/reference/Types#domtify)

删除元素的属性

### .remove( attributeName ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **attributeName**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 要删除的属性，支持空格分割。

该`.removeAttr()`方法使用JavaScript的[removeAttribute()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/removeAttribute)函数，但它的优点是能够直接在 domtify 对象上调用，并且可以解决不同浏览器之间不同的属性命名问题。

例子：

有以下的html片段：

```html
<input type="text" title="hello there" />
```

使用该方法删除元素的属性：

```js
d("input").removeAttr("title")
// 支持空格分割删除多个
d("input").removeAttr("title type")
```

返回的结果：

```html
<!-- 对应第一个只删除title -->
<input type="text" />

<!-- 同时删除了title和type -->
<input />
```
