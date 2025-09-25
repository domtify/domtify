# .remove()

## .remove( [selector ] )

- **返回:** [domtify](/reference/Types#domtify)

删除元素同时移除元素绑定的事件和存储在元素上数据

### .remove( [selector ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [String](/reference/Types#string)
  - **描述:** css选择器

> [!IMPORTANT]
> 如果您不想移除事件和数据请使用[.detach()](/reference/method-detach)

想象以下html：

```html
<div class="container">
  <div class="hello">Hello</div>
  <div class="goodbye">Goodbye</div>
</div>
```

我们可以针对任何元素进行删除：

```js
d(".hello").remove()
```

类名为`hello`的div将会被移除

```html
<div class="container">
  <div class="goodbye">Goodbye</div>
</div>
```
