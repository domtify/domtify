# .first()

## .first()

- **返回:** [domtify](/reference/Types#domtify)

将匹配的元素集合减少到集合中的第一个元素。

### .first() <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

此方法不接受任何参数。

给定一个表示DOM元素集合的domtify对象，`.first()`方法从该集合中的第一个元素构造一个新的domtify对象。

考虑一个包含简单列表的页面：

```html
<ul>
  <li>list item 1</li>
  <li>list item 2</li>
  <li>list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
</ul>
```

我们可以将此方法应用于列表项集合：

```js
d("li").first().css("background-color", "red")
```

此调用的结果是第一个项目具有红色背景。
