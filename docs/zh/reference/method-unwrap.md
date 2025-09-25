# .unwrap()

## .unwrap( )

- **返回:** [domtify](/reference/Types#domtify)

从 DOM 中删除匹配元素集的父元素，将匹配的元素保留在其位置。

### .unwrap() <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **此方法不接受任何参数**

### .unwrap( [selector ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 用于检查父元素的选择器。如果元素的父元素与选择器不匹配，则该元素不会被解包。

该`.unwrap()`方法移除元素的父元素并返回解包后的内容。这实际上是[.wrap()](/reference/method-wrap)方法的逆操作。匹配的元素（以及它们的兄弟元素，如果有的话）将在 DOM 结构中替换它们的父元素。

例子：

想象有以下html结构：

```html
<div><p>Hello</p></div>
<div><p>domtify</p></div>
```

使用unwrap方法给p标签解构出来:

```js
d("div p").unwrap()
```

得到的结果如下：

```html
<p>Hello</p>
<p>domtify</p>
```
