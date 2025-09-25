# .parentsUntil()

## .parentsUntil( [selector ] [, filter ] )

- **返回:** [domtify](/reference/Types#domtify)

获取当前匹配元素集合中每个元素的祖先元素，向上直到但不包括由选择器、DOM节点或jQuery对象匹配的元素。

### .parentsUntil( [selector ] [, filter ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 一个包含选择器表达式的字符串，用于指示在哪里停止匹配祖先元素。
- **filter**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 一个包含用于匹配元素的选择器表达式的字符串。

### .parentsUntil( [element ] [, filter ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **element**
  - **类型:** [Element](/reference/Types#element) | [domtify](/reference/Types#domtify)
  - **描述:** 一个DOM节点或domtify对象，用于指示在哪里停止匹配祖先元素。
- **filter**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 一个包含用于匹配元素的选择器表达式的字符串。

给定一个表示DOM元素集合的选择器表达式，`.parentsUntil()`方法会遍历这些元素的祖先元素，直到到达与方法参数中传递的选择器匹配的元素。生成的domtify对象包含所有祖先元素，直到但不包括由`.parentsUntil()`选择器匹配的元素。

如果选择器不匹配或未提供，将选择所有祖先元素；在这些情况下，它选择与未提供选择器时`.parents()`方法相同的元素。

可以使用DOM节点或domtify对象代替选择器作为`.parentsUntil()`的第一个参数。

该方法可选择接受选择器表达式作为其第二个参数。如果提供了此参数，将通过测试元素是否匹配它来过滤元素。
