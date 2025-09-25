# .height()

获取匹配元素集合中第一个元素的当前计算高度，或设置每个匹配元素的高度。

## .height()

- **返回:** [Number](/reference/Types#number)

获取匹配元素集合中第一个元素的当前计算高度。

### .height() <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **该方法不接收任何参数**

`.css( "height" )` 和 `.height()` 之间的区别在于，后者返回一个无单位的像素值（例如，400），而前者返回一个保留单位的值（例如，400px）。当需要在数学计算中使用元素的高度时，建议使用 `.height()` 方法。

参考图：

![height方法示例](/height.png)

该方法也适用于`window`和`document`对象

```js
// 返回浏览器视口的高度
$(window).height()

// 返回HTML文档的高度
$(document).height()
```

## .height( value )

- **返回:** [domtify](/reference/Types#domtify)

设置每个匹配元素的 CSS 高度。

### .height( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [String](/reference/Types#string) | [Number](/reference/Types#number)
  - **描述:** 表示像素数量的整数，或附加可选测量单位的整数（作为字符串）。

### .height( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [Integer](/reference/Types#integer) height ) => [String](/reference/Types#string) | [Number](/reference/Types#number)
  - **描述:** 一个返回要设置高度的函数。接收元素在集合中的索引位置和旧高度作为参数。在函数内部，`this` 指向集合中的当前元素。

当调用 `.height(value)` 时，value 可以是字符串（数字和单位）或数字。如果只为 value 提供数字，domtify 会假设为像素单位。但是，如果提供字符串，则必须为高度提供有效的 CSS 测量值（如 100px、50% 或 auto）。请注意，在现代浏览器中，CSS height 属性不包括内边距、边框或外边距。

如果没有指定明确的单位（如 'em' 或 '%'），则会在值后面连接 "px"。

请注意，`.height(value)` 设置框的内容高度，而不考虑 CSS `box-sizing` 属性的值。
