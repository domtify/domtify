# .parents()

## .parents( [selector ] )

- **返回:** [domtify](/reference/Types#domtify)

获取当前匹配元素集合中每个元素的祖先元素，可选择通过选择器进行过滤。

### .parent( [selector ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 包含用于匹配元素的选择器表达式的字符串。

给定一个表示一组 DOM 元素的 domtify 对象，`.parents()` 方法允许我们搜索 DOM 树中这些元素的祖先，并返回携带匹配元素的当前的 domtify 对象，这些元素按从直接父元素向上的顺序排列；元素按从最近的父元素到外层元素的顺序返回。当原始集合中有多个 DOM 元素时，结果集合也将按原始元素的反向顺序排列，并移除重复项。

`.parents()` 和 `.parent()`方法类似，但后者只在 DOM 树中向上遍历一个级别。另外，`d( "html" ).parent()` 方法返回一个包含 document 的集合，而 `d( "html" ).parents()` 返回一个空集合。

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

如果我们从项目 A 开始，可以找到它的祖先：

```js
d("li.item-a").parents().css("background-color", "red")
```

此调用的结果是 level-2 列表、项目 II 和 level-1 列表（以及向上一直到 `<html>` 元素）的红色背景。由于我们没有提供选择器表达式，所有祖先都是返回的 domtify 对象的一部分。如果我们提供了一个选择器，只有这些中匹配的项目才会被包含。
