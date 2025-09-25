# off

## .off( events [, handler ] )

- **返回:** [domtify](/reference/Types#domtify)

移除事件监听

### .off( events [, handler ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **events**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 空格或者逗号分割的事件名称字符串
- **handler**
  - **类型:** [Function](/reference/Types#function)( [Event](/reference/Types#event) eventObject )
  - **描述:** 事件监听时绑定的函数

### .off( events ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **events**
  - **类型:** [PlainObject](/reference/Types#plainobject)| [Function](/reference/Types#function)
  - **描述:** 可以是一个key是事件名称value是事件句柄的对象或者事件监听时绑定的函数

### .off() <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **无任何参数**

off方法用于移除on方法绑定的事件监听器。如果不传递任何参数表示移除该元素上绑定的所有事件。

## 用法

假如页面上绑定了如下的事件：

```html
<ul>
  <li>foo</li>
  <li>bar</li>
</ul>
<script>
  function handle(event) {
    console.log(`this is handle`)
  }

  function handle2(event) {
    console.log(`this is handle2`)
  }

  d("ul").on("click.ns click.ns1 click.ns2 mousedown.ns", "li", handle)
  d("ul").on("click.ns1.a.t", "li", handle2)
  d("ul").on("click.ns1.a.t", () => {
    console.log("clicked!")
  })
</script>
```

### 移除当前元素上所有绑定事件

```js
d("ul").off()
```

### 移除某个事件类型

```js
d("ul").off("click")
```

会移除所有的点击事件,包括携带了命名空间的点击事件。

### 移除特定的命名空间的事件,支持空格分割

```js
d("ul").off("click.ns1 click.ns2")
```

### 支持命名空间解绑

```js
d("ul").off(".ns1.a.t")
d("ul").off(".a")
d("ul").off(".ns1")
d("ul").off(".t")
d("ul").off(".a.t")
d("ul").off(".t.a")
```

### 支持通过句柄进一步过滤要解绑的

```js
// 移除所有句柄为`handle2`的`click`事件。
d("ul").off("click", handle2)

// 移除所有的携带ns1命名空间且句柄为handle2的事件。
d("ul").off(".ns1", handle2)
```

### 移除所有绑定了handle句柄的事件

```js
// 移除所有绑定了handle句柄的事件
d("ul").off(handle)
```
