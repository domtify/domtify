# .is()

## .is( selector )

- **返回:** [Boolean](/reference/Types#boolean)

检查当前匹配的元素集合是否与选择器、元素或domtify对象匹配，如果这些元素中**至少有一个与给定参数匹配，则返回true**。

### .is( selector ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 一个包含用于匹配元素的选择器表达式的字符串。

### .is( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [Element](/reference/Types#element) element ) => [Boolean](/reference/Types#boolean)
  - **描述:** 一个用作集合中每个元素测试的函数。它接受两个参数：`index`（元素在domtify集合中的索引）和`element`（DOM元素）。在函数内部，`this`引用当前的DOM元素。

### .is( selection ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [domtify](/reference/Types#domtify)
  - **描述:** 一个现有的domtify对象，用于与当前元素集合进行匹配。

### .is( elements ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **elements**
  - **类型:** [Element](/reference/Types#element)
  - **描述:** 一个或多个元素，用于与当前元素集合进行匹配。

与其他过滤方法不同，`.is()`不会创建新的domtify对象。相反，它允许您在不修改的情况下测试domtify对象的内容。这在回调函数中通常很有用，例如事件处理程序。

假设您有一个列表，其中两个项目包含子元素：

```html
<ul>
  <li>list <strong>item 1</strong></li>
  <li><span>list item 2</span></li>
  <li>list item 3</li>
</ul>
```

您可以将点击处理程序附加到`<ul>`元素，然后将代码限制为仅在点击列表项本身而不是其子项之一时触发：

```js
d("ul").on("click", function (event) {
  var target = d(event.target)
  if (target.is("li")) {
    target.css("background-color", "red")
  }
})
```

现在，当用户点击第一个项目中的"list"一词或第三个项目中的任何地方时，被点击的列表项将获得红色背景。但是，当用户点击第一个项目中的item 1或第二个项目中的任何地方时，什么都不会发生，因为在那些情况下，事件的目标分别是`<strong>`或`<span>`。

### 使用函数

此方法的第二种形式基于函数而不是选择器来评估与元素相关的表达式。对于每个元素，如果函数返回true，.is()也返回true。例如，给定一个稍微复杂一些的HTML片段：

```html
<ul>
  <li><strong>list</strong> item 1 - one strong tag</li>
  <li>
    <strong>list</strong> item <strong>2</strong> - two <span>strong tags</span>
  </li>
  <li>list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
</ul>
```

您可以将点击处理程序附加到每个`<li>`上，该处理程序评估当时被点击的`<li>`内`<strong>`元素的数量，如下所示：

```js
d("li").on("click", function () {
  var li = d(this),
    isWithTwo = li.is(function () {
      return d("strong", this).length === 2
    })
  if (isWithTwo) {
    li.css("background-color", "green")
  } else {
    li.css("background-color", "red")
  }
})
```
