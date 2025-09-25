# .each()

## .each( function )

- **返回:** [domtify](/reference/Types#domtify)

遍历 domtify 对象，对每个匹配的元素执行一个函数。

### .each( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [Element](/reference/Types#element) element )
  - **描述:** 为每个匹配的元素执行的函数。

`.each()` 方法旨在使 DOM 循环结构简洁且不易出错。调用时，它会遍历作为 jQuery 对象一部分的 DOM 元素。每次回调运行时，都会传递当前的循环迭代次数，从 0 开始。更重要的是，回调是在当前 DOM 元素的上下文中触发的，因此关键字 `this` 指的是该元素。

假设你在页面上有一个简单的无序列表：

```html
<ul>
  <li>foo</li>
  <li>bar</li>
</ul>
```

你可以选择列表项并对它们进行遍历：

```js
d("li").each(function (index) {
  console.log(index + ": " + d(this).text())
})
```

因此，每个列表项都会记录一条消息：

```
0: foo
1: bar
```

你可以通过在回调函数中返回 false 来停止循环。

注意：大多数返回 domtify 对象的 domtify 方法也会遍历 domtify 集合中的元素集——这个过程称为隐式迭代。当发生这种情况时，通常不需要显式地使用 .each() 方法进行迭代：

```js
// 这里不需要使用 .each() 方法：
d("li").each(function () {
  d(this).addClass("foo")
})

// 相反，你应该依赖于隐式迭代：
d("li").addClass("bar")
```
