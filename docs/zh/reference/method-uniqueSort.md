# .uniqueSort()

## .uniqueSort()

- **返回:** [domtify](/reference/Types#domtify)

对 domtify DOM 元素对象进行排序，并删除重复项。

> [!WARNING]
> 请注意，该操作仅适用于由 DOM 元素组成的 domtify 对象，不适用于字符串或数字。

### .uniqueSort( ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **此方法不接受任何参数**

`.uniqueSort()` 函数会在一个 domtify 对象中进行搜索，对其中的元素按照文档顺序进行排序，并移除任何重复的节点。
如果某个节点与 domtify 对象中已有的节点完全相同，就会被视为重复节点；而两个不同的节点，即使它们拥有完全相同的属性，也不会被认为是重复的。
此函数仅适用于由 **DOM 元素** 组成的 domtify 对象。

例子：

想象页面上有以下html:

```html
<div class="item-1">1</div>
<div class="item-2">2</div>
<div class="dup">3</div>
<div class="dup">4</div>
<div class="dup">5</div>
<div class="item-6">6</div>
```

使用该方法去重：

```js
/* 
    1.找到所有的div
    2.找到携带.dup类的div然后加入到原先的数组
    3.使用这个拼接的数组再创建一个新的集合对象
    3.使用uniqueSort去重
*/
let divs = $("div").get()
divs = divs.concat($(".dup").get())
$(divs).length // 9
$(divs).uniqueSort().length // 6
```

自动排序功能演示：

```js
const result = d([
  document.querySelector(".item-6"),
  document.querySelector(".item-1"),
  document.querySelector(".item-2"),
])
```

打印返回结果：

```html
<div class="item-6">6</div>
<div class="item-1">1</div>
<div class="item-2">2</div>
```

使用该方法它会按照文档上的顺序自动排序：

```js
const result = d([
  document.querySelector(".item-6"),
  document.querySelector(".item-1"),
  document.querySelector(".item-2"),
]).uniqueSort()
```

此时的顺序和文档上的顺序一致：

```html
<div class="item-1">1</div>
<div class="item-2">2</div>
<div class="item-6">6</div>
```
