# .parent()

## .parent( [selector ] )

- **返回:** [domtify](/reference/Types#domtify)

获取当前匹配元素集合中每个元素的父元素，可选择通过选择器进行过滤。

### .parent( [selector ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 一个包含选择器表达式的字符串，用于匹配元素。

给定一个表示一组 DOM 元素的 domtify 对象，`parent()` 方法会遍历到 DOM 树中这些元素中每个元素的直接父元素，并返回携带匹配元素的当前的 domtify 对象

此方法类似于 `.parents()`，但 `.parent()` 只在 DOM 树中向上遍历**一个**级别。另外，`d( "html" ).parent()` 方法返回一个包含 `document` 的集合，而 `d( "html" ).parents()` 返回一个空集合。

该方法可选择接受与我们传递给 `d()` 函数相同类型的选择器表达式。如果提供了选择器，将通过测试元素是否匹配它来过滤元素。

考虑一个包含基本嵌套列表的页面：

```html
<ul class="level-1">
  <li class="item-i">I</li>
  <li class="item-ii">
    II
    <ul class="level-2">
      <li class="item-a">A</li>
      <li class="item-b">
        B
        <ul class="level-3">
          <li class="item-1">1</li>
          <li class="item-2">2</li>
          <li class="item-3">3</li>
        </ul>
      </li>
      <li class="item-c">C</li>
    </ul>
  </li>
  <li class="item-iii">III</li>
</ul>
```

如果我们从项目 A 开始，可以找到它的父元素：

```js
d("li.item-a").parent().css("background-color", "red")
```

此调用的结果是 level-2 列表的红色背景。由于我们没有提供选择器表达式，父元素明确地包含在对象中。如果我们提供了一个选择器，元素在被包含之前会被测试是否匹配。
