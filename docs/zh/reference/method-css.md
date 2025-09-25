# .css()

获取匹配元素集合中第一个元素的计算样式属性值，或为每个匹配元素设置一个或多个CSS属性。

## .css( propertyName )

- **返回:** [String](/reference/Types#string) | [Object](/reference/Types#object)

获取匹配元素集合中第一个元素的计算样式属性。

### .css( propertyName ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **propertyName**
  - **类型:** [String](/reference/Types#string)
  - **描述:** css属性名

获取元素的单个行内样式

考虑以下html：

```html
<div class="div" style="background-color: blue"></div>
```

```js
const bgColor = d("div").css("background-color") //rgb(0, 0, 255)
```

### .css( propertyNames ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **propertyNames**
  - **类型:** [Array](/reference/Types#array)
  - **描述:** 包含一个或多个css属性名的数组

同时获取元素的多个行内样式,返回一个属性值对象

考虑以下html：

```html
<div class="div" style="background-color: blue"></div>
```

通过数组的方式同时获取三个`width`、`height`、`background-color`属性

```js
const style = d("div").css(["width", "height", "background-color"])
```

可以看到结果如下：

```js
{
    "width": "1520px",
    "height": "0px",
    "background-color": "rgb(0, 0, 255)"
}
```

> [!WARNING]
> 你会发现除了背景颜色其它的不存在style属性上的样式它也能获取,是因为底层用的是[getComputedStyle](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)

## .css( propertyName, value )

- **返回:** [domtify](/reference/Types#domtify)

给匹配的元素设置样式

> [!IMPORTANT]
> `d.css()`方法相比`$.css()`默认就支持优先级`!important`✨

### .css( propertyName, value [,priority] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **propertyName**
  - **类型:** [String](/reference/Types#string)
  - **描述:** css属性名
- **value**
  - **类型:** [String](/reference/Types#string)
  - **描述:** css属性值
- **priority**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 允许设置 "important" CSS 优先级。如果没有指定，则当作空字符串。

### .css( propertyName, function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **propertyName**
  - **类型:** [String](/reference/Types#string)
  - **描述:** css属性名
- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [String](/reference/Types#string) value ) => [String](/reference/Types#string)
  - **描述:** 一个返回要设置的值的函数。`this`是当前元素。接收元素在集合中的索引位置和旧值作为参数。

### .css( properties ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **properties**
  - **类型:** [PlainObject](/reference/Types#plainobject)
  - **描述:** 要设置的属性值对的对象。

与`.prop()`方法一样，该`.css()`方法可以快速轻松地设置元素的属性。此方法可以将属性名称和值作为单独的参数，也可以将单个键值对对象作为参数。

如果您传入的参数是一个字面量对象`PlainObject`来批量设置样式,它也支持设置"important" CSS 优先级,就像下面的例子：

```js
d("#box1").css({
  "background-color": "yellow !important",
  "font-weight": "bolder !important",
})
```
