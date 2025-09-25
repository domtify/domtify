# .prev()

## .prev( [selector ] )

- **返回:** [domtify](/reference/Types#domtify)

用于获取当前元素的前一个相邻兄弟元素。如果提供了选择器，则仅当前一个相邻兄弟元素与该选择器匹配时才检索它。

### .prev( [selector ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 包含用于匹配元素的选择器表达式的字符串。

用于获取当前元素的前一个相邻兄弟元素。

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
d("li.third-item").prev().css("background-color", "red")
```

第而项背景变红

也可以过滤特定的下一个相邻的兄弟元素

```js
d("li").prev(".third-item").css("background-color", "red")
```

此时只有第三项背景变红
