# .children()

## .children( [selector ] )

- **返回:** [domtify](/reference/Types#domtify)

获取匹配元素集合中每个元素的子元素，可选择通过选择器进行过滤。

### .children( [selector ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 包含用于匹配元素的选择器表达式的字符串。

例子：

想象有以下html代码片段：

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

如果我们从 2 级列表开始，我们可以找到它的子列表：

```js
d("ul.level-2").children().css("background-color", "red")
```

此调用的结果是项目 A、B 和 C 后面的背景为红色。
