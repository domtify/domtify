# .eq()

## .eq( index )

- **返回:** [domtify](/reference/Types#domtify)

将匹配元素集减少为指定索引处的元素集。

### .eq( index ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **index**
  - **类型:** [Integer](/reference/Types#integer)
  - **描述:** 一个表示元素从0开始的位置的整数。

### .eq( indexFromEnd ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **indexFromEnd**
  - **类型:** [Integer](/reference/Types#integer)
  - **描述:** 一个表示元素位置的整数，从集合中的最后一个元素开始向后计数。

给定一个表示DOM元素集合的domtify对象，`.eq()`方法从该集合中的一个元素构造一个新的domtify对象。提供的索引标识该元素在集合中的位置。

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
d("li").eq(2).css("background-color", "red")
```

此调用的结果是项目3具有红色背景。请注意，提供的索引是从0开始的，并且引用元素在domtify对象中的位置，而不是在DOM树中的位置。

提供负数表示从集合末尾开始的位置，而不是从开头开始。例如：

```js
d("li").eq(-2).css("background-color", "red")
```

这次列表项4变为红色，因为它是从集合末尾开始的第二个。

如果在指定的从0开始的索引处找不到元素，该方法将构造一个具有空集合且`length`属性为0的新domtify对象。

```js
d("li").eq(5).css("background-color", "red")
```

在这里，没有列表项变为红色，因为`.eq( 5 )`表示五个列表项中的第六个。
