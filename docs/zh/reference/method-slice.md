# .slice()

## .slice( start [, end ] )

- **返回:** [domtify](/reference/Types#domtify)

将匹配元素集减少为由索引范围指定的子集。

### .slice( start [, end ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **start**
  - **类型:** [Integer](/reference/Types#integer)
  - **描述:** 一个整数，表示从 0 开始选择元素的位置。如果为负数，则表示相对于集合末尾的偏移量。
- **end**
  - **类型:** [Integer](/reference/Types#integer)
  - **描述:** 一个整数，表示元素停止被选择的位置（以 0 为基数）。如果为负数，则表示相对于集合末尾的偏移量。如果省略，则范围持续到集合末尾。

效果和Array的[slice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)方法相同。

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
d("li").slice(2).css("background-color", "red")
```

此调用的结果是项目 3、4 和 5 的背景为红色。

> [!WARNING]
> 提供的索引从零开始，并且指的是元素在 jQuery 对象内的位置，而不是在 DOM 树内的位置。
