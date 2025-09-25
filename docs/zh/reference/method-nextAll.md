# .nextAll()

## .nextAll( [selector ] )

- **返回:** [domtify](/reference/Types#domtify)

用于获取当前元素之后的所有兄弟元素。可选择通过选择器进行过滤。

### .nextAll( [selector ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 包含用于匹配元素的选择器表达式的字符串。

用于获取当前元素之后的所有兄弟元素。

例子：

```html
<ul>
  <li>list item 1</li>
  <li>list item 2</li>
  <li class="third-item">list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
</ul>
```

查找第三项之后的所有元素

```js
d("li.third-item").nextAll().css("background-color", "red")
```

结果第四和第五个项目背景变红

也可以过滤后续的元素

```js
d("li:first-child").nextAll(".third-item")
```

结果第三项背景变红
