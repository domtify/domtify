# d.each()

## d.each( array, callback )

- **返回:** [Object](/reference/Types#object)

一个通用的迭代器函数，可用于无缝遍历对象和数组。具有 `length` 属性的数组和类数组对象（例如函数的 `arguments` 对象）会按数字索引从 `0` 遍历到 `length - 1`。其他对象则通过它们的命名属性进行遍历。

### d.each( array, callback ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **array**
  - **类型:** [ArrayLikeObject](/reference/Types#arraylikeobject)
  - **描述:** 要迭代的数组或类似数组的对象。

- **callback**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) indexInArray,[Object](/reference/Types#object) value )
  - **描述:** 将对每个值执行的函数。

### d.each( object, callback ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **object**
  - **类型:** [Object](/reference/Types#object)
  - **描述:** 要迭代的对象。

- **callback**
  - **类型:** [Function](/reference/Types#function)( [String](/reference/Types#string) propertyName,[Object](/reference/Types#object) valueOfProperty )
  - **描述:** 将对每个值执行的函数。

`d.each` 是一个通用遍历函数，可以遍历数组、类数组和对象，遇到 `return false` 会停止遍历。

例子：

想象页面上有以下html:

```html
<div id="d1"></div>
<div id="d2"></div>
<div id="d3"></div>
<div id="d4"></div>
```

可以遍历domtify对象

> [!NOTE]
> domtify对象和jquery对象都是[ArrayLikeObject](/reference/Types#arraylikeobject)。

```js
$("div").each(function (index, el) {
  console.log(index) // 索引
  console.log(el) // element元素

  if (el.id === "d2") return false // 可以中断
})
```

控制台的打印结果

```
0 <div id="d1"></div>
1 <div id="d2"></div>
```
