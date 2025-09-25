# .removeProp ()

## .removeProp ( propertyName )

- **返回:** [domtify](/reference/Types#domtify)

删除匹配元素集的属性,更具体的来说是删除[.prop()](/reference/method-prop)方法存储的数据。

### .removeProp( propertyName ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **propertyName**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 要删除的属性的名称。

该`.removeProp()`方法删除了由[.prop()](/reference/method-prop)方法设置的属性。

> [!NOTE]
> 此方法不应用于移除内置（原生）属性，例如“checked”、“disabled”、“selected”或其他属性。这可能会导致意外行为。

例子：

有以下html片段：

```html
<p></p>
```

使用该方法删除元素对象属性：

```js
// 先设置一个属性到p元素对象上
d("p").prop("foo", "bar")

// 删除
d("p").removeProp("foo")

d("p").prop("foo") // 再次读取,结果为：undefined
```
