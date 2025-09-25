# .get()

检索与domtify对象匹配的DOM元素。

## .get( index )

- **返回:** [Element](/reference/Types#element)

检索 domtify 对象匹配的元素之一

### .get( index ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **index**
  - **类型:** [Integer](/reference/Types#integer)
  - **描述:** 一个从零开始的整数，指示要检索的元素。

`.get()` 方法允许访问每个 jQuery 对象所对应的 DOM 节点。如果 `index` 的值超出范围——小于元素数量的负值，或大于等于元素数量——则返回 `undefined`。请看一个简单的无序列表：

```html
<ul>
  <li id="foo">foo</li>
  <li id="bar">bar</li>
</ul>
```

指定索引时，.get( index ) 会检索单个元素：

```js
console.log(d("li").get(0))
```

由于索引是从零开始的，因此返回的是第一个列表项：

```
<li id="foo">
```

取最后一项

```js
console.log(d("li").get(-1))
```

## .get()

- **返回:** [Array](/reference/Types#array)

检索 domtify 对象匹配的元素

### .get() <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

此方法不接受任何参数。

考虑一个简单的无序列表：

```html
<ul>
  <li id="foo">foo</li>
  <li id="bar">bar</li>
</ul>
```

没有参数时，`.get()`返回所有元素的数组：

```js
console.log(d("li").get())
```

此调用将返回所有匹配的 DOM 节点，包含在标准数组中：

```
[<li id="foo">, <li id="bar">]
```
