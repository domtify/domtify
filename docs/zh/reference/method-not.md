# .not()

## .not( selector )

- **返回:** [domtify](/reference/Types#domtify)

从匹配元素集合中删除元素。

### .not( selector ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector) | [Element](/reference/Types#element) | [Array](/reference/Types#array)
  - **描述:** 包含选择器表达式、DOM 元素或与集合匹配的元素数组的字符串。

### .not( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [Element](/reference/Types#element) element ) => [Boolean](/reference/Types#boolean)
  - **描述:** 用于对集合中的每个元素进行测试的函数。它接受两个参数，`index`，它是该元素在 domtify 集合中的索引，和 `element`，它是 DOM 元素。在函数内部，`this` 指向当前的 DOM 元素。

### .not( selection ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selection**
  - **类型:** [domtify](/reference/Types#domtify)
  - **描述:** 与当前元素集匹配的现有 domtify 对象。

从集合中排除掉一部分不需要的元素

例子：

```html
<ul>
  <li>list item 1</li>
  <li>list item 2</li>
  <li>list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
</ul>
```

我们可以将此方法应用于列表项集：

```js
d("li").not(":nth-child(2n)").css("background-color", "red")
```

此调用的结果是项目 1、3 和 5 的背景为红色，因为它们与选择器不匹配。
