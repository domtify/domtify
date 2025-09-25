# .odd()

## .odd()

- **返回:** [domtify](/reference/Types#domtify)

返回集合中索引为奇数的元素（从 0 开始计数）。

### .odd( ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **该方法不需要参数**

想象有以下html片段：

```html
<ul>
  <li>list item 0</li>
  <li>list item 1</li>
  <li>list item 2</li>
  <li>list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
</ul>
```

使用该方法找到索引为奇数的元素：

```js
d("li").odd().css("background-color", "red")
```

结果是下面几项背景变红色：

```html
<li>list item 1</li>
<li>list item 3</li>
<li>list item 5</li>
```
