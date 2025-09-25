# .empty()

## .empty()

- **返回:** [domtify](/reference/Types#domtify)

从DOM中移除匹配元素集合的所有子节点。

### .empty() <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **该方法无需任何参数**

此方法不仅移除子（和其他后代）元素，还移除匹配元素集合中的任何文本。这是因为，根据DOM规范，元素内的任何文本字符串都被视为该元素的子节点。考虑以下HTML：

```html
<div class="container">
  <div class="hello">Hello</div>
  <div class="goodbye">Goodbye</div>
</div>
```

我们可以针对任何元素进行移除：

```js
d(".hello").empty()
```

这将导致DOM结构中Hello文本被删除：

```html
<div class="container">
  <div class="hello"></div>
  <div class="goodbye">Goodbye</div>
</div>
```
