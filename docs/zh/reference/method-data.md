# .data()

存储与匹配元素相关的任意数据，或返回匹配元素集合中第一个元素的命名数据存储区中的值。

> [!TIP]
> 该方法和jQuery的data方法是完全兼容的。如果您有更多个性化的需求(比如要附加前缀),您可以看看[dataset-config](https://github.com/ajiho/dataset-config)。

## .data( key, value )

- **返回:** [domtify](/reference/Types#domtify)

存储与匹配元素相关的任意数据。

### .data( key, value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **key**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 数据存储的key
- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 要存储的数据

### .data( obj ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **obj**
  - **类型:** [Object](/reference/Types#object)
  - **描述:** 要更新的数据的键值对对象。

该`.data()`方法允许我们将任何类型的数据附加到 DOM 元素

看几个简单的例子：

```js
d("body").data("foo", 52)
d("body").data("bar", { isManual: true })
d("body").data({ baz: [1, 2, 3] })
d("body").data("foo") // 52
d("body").data() // { foo: 52, bar: { isManual: true }, baz: [ 1, 2, 3 ] }
```

## .data( key )

- **返回:** [Object](/reference/Types#object)

返回与 domtify 集合中第一个元素关联的任意数据,包括`.data()`方法设置的数据和HTML5 `data-*`设置的属性

### .data( key ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **key**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 数据存储时的key

### .data( ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **该方法不需要任何参数**

该`.data()`方法允许我们读取先前与 DOM 元素关联的数据。我们可以一次检索单个元素的多个不同值，也可以将其作为集合检索：

```js
const elem = document.createElement("span")
$(elem).data("foo") // undefined
$(elem).data() // {}

$(elem).data("foo", 42)
$(elem).data("foo") // 42
$(elem).data() // { foo: 42 }
```

> [!WARNING] 注意:
> data方法会对一些数据做一些适当的解析

例子：

```html
<div
  data-role="page"
  data-last-value="43"
  data-hidden="true"
  data-options='{"name":"John"}'
></div>
```

以下比较都是正确的

```js
d("div").data("role") === "page"
d("div").data("lastValue") === 43
d("div").data("hidden") === true
d("div").data("options").name === "John"
```

原因是data方法在内部会对一些数据自动多一些转化,比如字符串的数字会被转成Number类型的数字，json字符串会被自动转换成对象等。
