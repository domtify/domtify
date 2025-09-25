# .next()

## .next( [selector ] )

- **返回:** [domtify](/reference/Types#domtify)

用于获取当前元素的后一个相邻兄弟元素。如果提供了选择器，则仅当后一个相邻兄弟元素与该选择器匹配时才检索它。

### .next( [selector ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 包含用于匹配元素的选择器表达式的字符串。

用于获取当前元素的后一个相邻兄弟元素。

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

找第三项的下一个兄弟元素

```js
d("li.third-item").next().css("background-color", "red")
```

第四项背景变红

也可以过滤特定的下一个相邻的兄弟元素

```js
d("li").next(".third-item").css("background-color", "red")
```

此时只有第三项背景变红
