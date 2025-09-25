# .siblings()

## .siblings( [selector ] )

- **返回:** [domtify](/reference/Types#domtify)

获取匹配元素集合中每个元素的兄弟元素，可选择通过选择器进行过滤。

### .siblings( [selector ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 一个包含用于匹配元素的选择器表达式的字符串。

给定一个表示DOM元素集合的domtify对象，`.siblings()`方法允许我们搜索DOM树中这些元素的兄弟元素，并返回携带匹配元素的当前的 domtify 对象

该方法可选择接受与我们传递给`$()`函数相同类型的选择器表达式。如果提供了选择器，将通过测试元素是否匹配它来过滤元素。

考虑一个包含简单列表的页面：

```html
<ul>
  <li>list item 1</li>
  <li>list item 2</li>
  <li class="third-item">list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
</ul>
```

如果我们从第三个项目开始，我们可以找到它的兄弟元素：

```js
$("li.third-item").siblings().css("background-color", "red")
```

这个调用的结果是项目1、2、4和5后面有红色背景。由于我们没有提供选择器表达式，所有兄弟元素都是对象的一部分。如果我们提供了一个，只有这四个中匹配的项目会被包含在内。

原始元素不包含在兄弟元素中，当我们希望找到DOM树特定级别的所有元素时，记住这一点很重要。但是，如果原始集合包含多个元素，它们可能是相互的兄弟元素，并且都会被找到。如果你需要一个排他的兄弟元素列表，请使用`$collection.siblings().not($collection)`。
