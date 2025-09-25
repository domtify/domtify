# .val()

获取匹配元素集合中第一个元素的当前值或设置每个匹配元素的值。

## .val()

- **返回:** [String](/reference/Types#string) | [Number](/reference/Types#number) | [Array](/reference/Types#array)

获取匹配元素集合中第一个元素的当前值。

### .val() <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **该方法不接受任何参数**

`.val()`方法主要用于获取表单元素（如input、select和textarea）的值。当在空集合上调用时，它返回undefined。

设置了`multiple`属性的`select`元素,`.val()`返回一个包含每个选中选项值的数组

## .val( value )

- **返回:** [domtify](/reference/Types#domtify)

设置匹配元素集合中每个元素的值。

### .val( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [String](/reference/Types#string) | [Number](/reference/Types#number) | [Array](/reference/Types#array)
  - **描述:** 一个文本字符串、数字或字符串数组，对应于要设置为选中/勾选状态的每个匹配元素的值。

### .val( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [String](/reference/Types#string) value ) => [String](/reference/Types#string)
  - **描述:** 一个返回要设置的值的函数。this是当前元素。接收元素在集合中的索引位置和旧值作为参数。

此方法通常用于设置表单字段的值。

`val()`允许你传递一个元素值的数组。当处理包含`<input type="checkbox">`、`<input type="radio">`和`<select>`中的`<option>`等元素的domtify对象时，这非常有用。在这种情况下，值与数组中某个元素匹配的输入框和选项将被选中或勾选，而值不匹配数组中任何元素的则会被取消选中或取消选择，具体取决于类型。对于属于同一单选按钮组的`<input type="radio">`和`<select>`，任何先前被选中的元素都将被取消选择。
