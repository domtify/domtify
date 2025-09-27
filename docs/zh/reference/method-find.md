# .find()

## .find( selector )

- **返回:** [domtify](/reference/Types#domtify)

获取当前匹配元素集合中每个元素的后代元素，通过选择器、domtify对象或元素进行过滤。

### .find( selector ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** 一个包含用于匹配元素的选择器表达式的字符串。

### .find( element ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **element**
  - **类型:** [Element](/reference/Types#element) | [domtify](/reference/Types#domtify)
  - **描述:** 一个用于匹配元素的元素或domtify对象。

`find` 方法的作用是在当前匹配元素的后代中查找符合指定选择器的元素。

例子：

想象有以下html结构：

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

如果我们从项目`.item-ii`开始，我们可以在其中找到列表`li`项目：

```js
d("li.item-ii").find("li").css("background-color", "red")
```

这个调用的结果是项目A、B、1、2、3和C有红色背景。尽管项目II匹配选择器表达式，但它不包含在结果中；只有后代元素被认为是匹配的候选者。

与大多数树遍历方法不同，`.find()`调用中需要选择器表达式。如果我们需要检索所有后代元素，我们可以传入通用选择器`'*'`来实现这一点。

选择器上下文是通过`.find()`方法实现的；因此，`d( "li.item-ii" ).find( "li" )`等同于`d( "li", "li.item-ii" )`。

我们还可以用给定的domtify集合或元素过滤选择。使用与上面相同的嵌套列表，如果我们从以下开始：

```js
const allListElements = d("li")
```

然后将这个domtify对象传递给find：

```js
d("li.item-ii").find(allListElements)
```

这将返回一个domtify集合，其中只包含项目II的后代列表元素。

类似地，元素也可以传递给find：

```js
const item1 = d("li.item-1")[0]
d("li.item-ii").find(item1).css("background-color", "red")
```

这个调用的结果将是项目1有红色背景。
