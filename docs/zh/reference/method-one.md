# one

## .one( events [, selector ] , handler [, options ] )

- **返回:** [domtify](/reference/Types#domtify)

绑定一次性事件

### .one( events [, selector ] , handler [, options ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **events**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 一个或多个以空格或逗号分隔的事件类型和可选命名空间，例如：`"click"`、`"keydown.myPlugin"`。
- **selector**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 事件委托所用,触发事件的子元素过滤选择器
- **handler**
  - **类型:** [Function](/reference/Types#function)( [Event](/reference/Types#event) eventObject [, [Anything](/reference/Types#anything) extraParameter ] [, ... ] )
  - **描述:** 事件触发时执行的函数。
- **options**
  - **类型:** [PlainObject](/reference/Types#plainobject)
  - **描述:** `addEventListener`方法的`options`参数

本质上它底层调用的还是[on](/reference/method-on)方法,该方法只会触发一次

## 用法

假定页面的html如下：

```html
<ul>
  <li id="foo">foo</li>
  <li id="bar">bar</li>
</ul>
```

### 一次性点击事件

```js
d("#foo").one("click", handler)
```

### 一次性委托事件

```js
d("ul").one("click", "li", handler)
```

### 也支持options选项

```js
d("#foo").one("click", handler, true)
d("#foo").one("click", handler, { capture: true })
d("#foo").one("click", handler, { capture: true, passive: false })

// 委托也支持第options选项
d("ul").one("click", "li", handler, { capture: true })
```
