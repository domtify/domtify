# .has()

## .has( selector )

- **返回:** [domtify](/reference/Types#domtify)

将匹配的元素集减少为具有与选择器或 DOM 元素匹配的后代的元素集。

### .has( selector ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 一个包含选择器表达式的字符串，用于匹配元素。

### .has( contained ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **contained**
  - **类型:** [Element](/reference/Types#element)
  - **描述:** 一个用于匹配元素的DOM元素。

过滤出集合中的元素的后代元素中包含传入的元素的元素

例子

```html
<ul>
  <li>list item 1</li>
  <li>
    list item 2
    <ul>
      <li>list item 2-a</li>
      <li>list item 2-b</li>
    </ul>
  </li>
  <li>list item 3</li>
  <li>list item 4</li>
</ul>
```

我们可以将此方法应用于列表项集，如下所示：

```js
d("li").has("ul").css("background-color", "red")
```

此调用的结果是项目 2 的背景为红色，因为它是其后代中唯一具有`<ul>`的`<li>`
