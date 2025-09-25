# .filter()

## .filter()

- **返回:** [domtify](/reference/Types#domtify)

将匹配的元素集减少为与选择器匹配或通过函数测试的元素。

### .filter( selector ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 包含与当前元素集匹配的选择器表达式的字符串。

### .filter( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [ Element](/reference/Types#element) element ) => [Boolean](/reference/Types#boolean)
  - **描述:** 用于测试集合中每个元素的函数。this是当前的 DOM 元素。

### .filter( elements ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **elements**
  - **类型:** [Element](/reference/Types#element)
  - **描述:** 与当前元素集匹配的一个或多个 DOM 元素。

### .filter( selection ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selection**
  - **类型:** [domtify](/reference/Types#domtify)
  - **描述:** 与当前元素集匹配的现有 domtify 对象。

给定一个表示DOM元素集合的domtify对象，`.filter()`方法从匹配元素的子集构造一个新的domtify对象。提供的选择器会针对每个元素进行测试；所有匹配选择器的元素都将包含在结果中。

考虑一个包含简单列表的页面：

```html
<ul>
  <li>list item 1</li>
  <li>list item 2</li>
  <li>list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
  <li>list item 6</li>
</ul>
```

我们可以将此方法应用于列表项集合：

```js
$("li").filter(":nth-child(2n)").css("background-color", "red")
```

此调用的结果是项目2、4和6具有红色背景，因为它们匹配选择器。

### 使用过滤函数

此方法的第二种形式允许我们针对函数而不是选择器来过滤元素。对于每个元素，如果函数返回`true`（或"真值"），该元素将包含在过滤后的集合中；否则，它将被排除。假设我们有一个稍微复杂一些的HTML片段：

```html
<ul>
  <li><strong>list</strong> item 1 - one strong tag</li>
  <li>
    <strong>list</strong> item <strong>2</strong> - two <span>strong tags</span>
  </li>
  <li>list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
  <li>list item 6</li>
</ul>
```

我们可以选择列表项，然后根据其内容过滤它们：

```js
$("li")
  .filter(function (index) {
    return $("strong", this).length === 1
  })
  .css("background-color", "red")
```

此代码将只改变第一个列表项，因为它恰好包含一个`<strong>`标签。在过滤函数中，`this`依次引用每个DOM元素。传递给函数的参数告诉我们该DOM元素在domtify对象匹配的集合中的索引。

我们还可以利用通过函数传递的索引，它表示元素在未过滤的匹配元素集合中从0开始的位置：

```js
$("li")
  .filter(function (index) {
    return index % 3 === 2
  })
  .css("background-color", "red")
```

对代码的这种修改将导致第三个和第六个列表项被高亮显示，因为它使用模运算符（`%`）来选择索引值除以3时余数为2的每个项目。

注意：当CSS选择器字符串传递给`.filter()`时，文本和注释节点在过滤过程中将始终从结果domtify对象中移除。当提供特定节点或节点数组时，文本或注释节点只有在匹配过滤数组中的节点之一时才会包含在结果domtify对象中。
