# .outerWidth()

获取匹配元素集合中第一个元素的当前计算宽度，或设置每个匹配元素的宽度。

## .outerWidth( [includeMargin ] )

- **返回:** [Number](/reference/Types#number)

获取匹配元素集合中第一个元素的当前计算外部宽度（包括填充、边框和可选边距）

### .outerWidth( [includeMargin ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **includeMargin(default: `false`)**
  - **类型:** [Boolean](/reference/Types#boolean)
  - **描述:** 布尔值，指示是否在计算中包含元素的边距。

返回元素的宽度，包括顶部和底部填充、边框以及可选的边距（以像素为单位）。如果在空元素集上调用，则返回undefined。

参考图:

![height方法示例](/outerWidth.png)

## .outerWidth( value [, includeMargin ] )

- **返回:** [domtify](/reference/Types#domtify)

设置匹配元素集合中每个元素的 CSS 外部宽度。

### .outerWidth( value [, includeMargin ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [String](/reference/Types#string) | [Number](/reference/Types#number)
  - **描述:** 表示像素数量的整数，或附加可选测量单位的整数（作为字符串）。
- **includeMargin(default: `false`)**
  - **类型:** [Boolean](/reference/Types#boolean)
  - **描述:** 布尔值，指示是否在计算中包含元素的边距。

### .outerWidth( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [Integer](/reference/Types#integer) height ) => [String](/reference/Types#string) | [Number](/reference/Types#number)
  - **描述:** 返回要设置的外部宽度的函数。接收元素在集合中的索引位置和旧的外部宽度作为参数。在函数中，`this`引用集合中的当前元素。

调用 `.outerWidth(value)` 时，`value` 可以是字符串（数字加单位）或纯数字。如果只提供数字，domtify 会默认使用像素（px）作为单位。而如果提供的是字符串，则可以使用任何有效的 CSS 测量单位，例如 `100px`、`50%` 或 `auto`。
