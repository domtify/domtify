# .detach()

## .detach( [selector ] )

- **返回:** [domtify](/reference/Types#domtify)

仅仅是删除元素

### .detach( [selector ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [String](/reference/Types#string)
  - **描述:** css选择器

> [!TIP]
> 如果您既想在删除元素的同时,又想移除事件和数据请使用[.remove()](/reference/method-remove)

想象以下html：

```html
<div class="container">
  <div class="hello">Hello</div>
  <div class="goodbye">Goodbye</div>
</div>
```

我们可以针对任何元素进行删除：

```js
d(".hello").detach()
```

类名为`hello`的div将会被移除

```html
<div class="container">
  <div class="goodbye">Goodbye</div>
</div>
```
