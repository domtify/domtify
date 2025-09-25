# .addBack()

## .addBack( [selector ] )

- **返回:** [domtify](/reference/Types#domtify)

将堆栈上的前一组元素添加到当前集合中，可选择通过选择器进行过滤。

### .addBack( [selector ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 包含与当前元素集匹配的选择器表达式的字符串。

正如[.end()](/reference/method-end)方法中所述，domtify 对象维护一个内部堆栈，用于跟踪匹配元素集的变化。当调用某个 DOM 遍历方法时，新的元素集会被推送到堆栈上。如果还需要之前的元素集，`.addBack()`可以使用 。

例子：

考虑有以下html片段：

```html
<ul>
  <li>list item 1</li>
  <li>list item 2</li>
  <li class="third-item">list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
</ul>
```

以下代码的结果是第 3、4 和 5 项后面的背景为红色：

```js
d("li.third-item").nextAll().addBack().css("background-color", "red")
```
