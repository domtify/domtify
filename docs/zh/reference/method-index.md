# .index()

## .index()

- **返回:** [domtify](/reference/Types#domtify)

在匹配的元素中搜索给定的元素。

### .index() <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **该方法不需要任何参数**

### .index( selector ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **selector**
  - **类型:** [Selector](/reference/Types#selector)
  - **描述:** css选择器

### .index( element ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **element**
  - **类型:** [Element](/reference/Types#element) | [domtify](/reference/Types#domtify)
  - **描述:** 一个表示domtify集合的选择器，在其中查找元素。

这个方法看jQuery官方文档有点绕，我这里写了更清晰明了的文档

查找指定元素在指定集合中的索引，如果不存在则返回`-1`

考虑以下代码片段:

```html
<ul>
  <li id="foo">foo</li>
  <li id="bar">bar</li>
  <li id="baz">baz</li>
</ul>
```

不传递参数,表示获取当前元素在兄弟中的位置。

```js
const index = d("li").index() // 0
```

你可能不知道它这个0是怎么来的，它底层其实是拿`d('li')`这个集合的第一个元素,这里其实就是`<li id="foo">foo</li>`,然后查找它在它兄弟节点的位置的所在位置，索引从零开始，所以这里的结果是`0`

字符串类型参数(css选择器)

```js
const index = d("#bar").index("li") //1
```

可以看到index方法传递的是字符串类型的参数,实际上是查找`d("#bar").get(0)`在集合`d("li")`的位置,所以是`1`

对象类型的参数(Element|domtify)

```js
const index = d("li").index(document.getElementById("baz")) //2
// 或
const index = d("li").index(d("#baz")) //2
```

是查找id为`baz`的元素在集合`d("li")`的位置
