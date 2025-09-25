# .innerHeight()

## .innerHeight()

- **返回:** [Number](/reference/Types#number)

描述：获取匹配元素集合中第一个元素的当前计算高度，包括填充但不包括边框。

### .height() <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **该方法不接收任何参数**

此方法返回元素的高度（包括顶部和底部填充），以像素为单位。如果在空元素集上调用，则返回`undefined`。

参考图：

![innerHeight](/innerHeight.png)

## .innerHeight( value )

- **返回:** [domtify](/reference/Types#domtify)

设置匹配元素集合中每个元素的 CSS 内部高度。

### .innerHeight( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [String](/reference/Types#string) | [Number](/reference/Types#number)
  - **描述:** 表示像素数的数字，或附加可选测量单位的数字（作为字符串）。

### .innerHeight( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [Integer](/reference/Types#integer) height ) => [String](/reference/Types#string) | [Number](/reference/Types#number)
  - **描述:** 返回要设置的内部高度（包括填充但不包含边框）的函数。接收元素在集合中的索引位置和旧的内部高度作为参数。在函数中，`this`引用集合中的当前元素。

调用 `.innerHeight("value")` 时，`value` 可以是字符串（数字加单位）或纯数字。如果只提供数字，domtify 会默认使用像素（px）作为单位。而如果提供的是字符串，则可以使用任何有效的 CSS 测量单位，例如 `100px`、`50%` 或 `auto`。

需要注意的是，在现代浏览器中，CSS 的 `height` 属性默认**不包括内边距（padding）、边框（border）或外边距（margin）**，除非使用了 `box-sizing` CSS 属性。

如果没有明确指定单位（比如 `"em"` 或 `"%"`），则默认会使用 `"px"`。
