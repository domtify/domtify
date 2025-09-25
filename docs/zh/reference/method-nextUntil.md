# .nextUntil()

## .nextUntil( [selector ] [, filter ] )

- **返回:** [domtify](/reference/Types#domtify)

用于获取当前元素之后直到指定元素前的所有兄弟元素。

### .nextUntil( [selector ] [, filter ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 包含选择器表达式的字符串，用于指示在何处停止匹配。
- **filter**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 一个包含用于匹配元素的选择器表达式的字符串。

### .nextUntil( [element ] [, filter ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **element**
  - **类型:** [Element](/reference/Types#element) | [domtify](/reference/Types#domtify)
  - **描述:** 一个 DOM 节点或 domtify 对象，指示在哪里停止匹配。
- **filter**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 一个包含用于匹配元素的选择器表达式的字符串。

与[.nextAll()](/reference/method-nextAll)方法效果相同,但是它支持在某个地方停止。

例子

```html
<dl>
  <dt id="term-1">term 1</dt>
  <dd>definition 1-a</dd>
  <dd>definition 1-b</dd>
  <dd>definition 1-c</dd>
  <dd>definition 1-d</dd>
  <dt id="term-2">term 2</dt>
  <dd>definition 2-a</dd>
  <dd class="b">definition 2-b</dd>
  <dd>definition 2-c</dd>
  <dt id="term-3">term 3</dt>
  <dd>definition 3-a</dd>
  <dd>definition 3-b</dd>
</dl>
```

查找`#term-2`之后的兄弟元素直到`dt`元素结束，并过滤出携带`.b`类名的元素：

```js
d("#term-2").nextUntil("dt", ".b").css("background-color", "red")
```

结果是携带`.b`类名的元素背景变红
