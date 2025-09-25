# .closest()

## .closest( selector )

- **返回:** [domtify](/reference/Types#domtify)

对于集合中的每个元素，通过测试元素本身并向上遍历其在DOM树中的祖先元素来获取与选择器匹配的第一个元素。

### .closest( selector ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 一个包含用于匹配元素的选择器表达式的字符串。

### .closest( selector [, context ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 一个包含用于匹配元素的选择器表达式的字符串。
- **context**
  - **类型:** [Element](/reference/Types#element)
  - **描述:** 一个DOM元素，在其中可能会找到匹配的元素。

### .closest( selection ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selection**
  - **类型:** [domtify](/reference/Types#domtify)
  - **描述:** 一个包含用于匹配元素的选择器表达式的字符串。

### .closest( element ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **element**
  - **类型:** [Element](/reference/Types#element)
  - **描述:** 一个用于匹配元素的元素。

给定一个表示DOM元素集合的domtify对象，`.closest()`方法会搜索这些元素及其在DOM树中的祖先元素，并返回携带匹配元素的当前的 domtify 对象。`.parents()`和`.closest()`方法相似，因为它们都向上遍历DOM树。不过，两者之间的差异虽然微妙，但很重要：

| `.closest()`                                                              | `.parents()`                                                                                                  |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 从当前元素开始                                                            | 从父元素开始                                                                                                  |
| 向上遍历DOM树，直到找到与提供的选择器匹配的元素                           | 向上遍历DOM树到文档的根元素，将每个祖先元素添加到临时集合中；然后如果提供了选择器，它会基于该选择器过滤该集合 |
| 返回的domtify对象为原始集合中的每个元素包含零个或一个元素，按文档顺序排列 | 返回的domtify对象为原始集合中的每个元素包含零个或多个元素，按反向文档顺序排列                                 |

```html
<ul id="one" class="level-1">
  <li class="item-i">I</li>
  <li id="ii" class="item-ii">
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

假设我们从项目A开始搜索`<ul>`元素：

```js
d("li.item-a").closest("ul").css("background-color", "red")
```

这将改变level-2 `<ul>`的颜色，因为它是向上遍历DOM树时遇到的第一个。

假设我们改为搜索`<li>`元素：

```js
d("li.item-a").closest("li").css("background-color", "red")
```

这将改变列表项目A的颜色。`.closest()`方法在向上遍历DOM树之前从其自身元素开始搜索，当项目A匹配选择器时停止。

我们可以传入一个DOM元素作为搜索最近元素的上下文。

```js
var listItemII = document.getElementById("ii")
d("li.item-a").closest("ul", listItemII).css("background-color", "red")
d("li.item-a").closest("#one", listItemII).css("background-color", "green")
```

这将改变level-2 `<ul>`的颜色，因为它既是列表项目A的第一个`<ul>`祖先，又是列表项目II的后代。但是，它不会改变level-1 `<ul>`的颜色，因为它不是列表项目II的后代。
