# .addClass()

## .addClass( className )

- **返回:** [domtify](/reference/Types#domtify)

将指定的类添加到匹配元素集中的每个元素。

### .addClass( className ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **className**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 一个或多个以空格分隔的类，添加到每个匹配元素的类属性中。

### .addClass( classNames ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **classNames**
  - **类型:** [Array](/reference/Types#array)
  - **描述:** 要添加到每个匹配元素的类属性的类数组。

### .addClass( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [String](/reference/Types#string) currentClassName ) => [String](/reference/Types#string)
  - **描述:** 一个返回一个或多个以空格分隔的类名的函数，这些类名将被添加到现有的类名中。该函数接收集合中元素的索引位置和现有的类名作为参数。在函数内部，`this` 指的是集合中的当前元素。

### .addClass( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [String](/reference/Types#string) currentClassName ) => [String](/reference/Types#string) | [Array](/reference/Types#array)
  - **描述:** 一个返回一个或多个以空格分隔的类名或类名数组的函数，这些类名将被添加到现有的类名中。该函数接收集合中元素的索引位置和现有的类名作为参数。在函数内部，`this` 指的是集合中的当前元素。

可以一次将多个类添加到匹配元素集合中（以空格分隔），如下所示：

```js
d("p").addClass("myClass yourClass")
```

此方法通常用于`.removeClass()`将元素的类从一个切换到另一个，如下所示：

```js
d("p").removeClass("myClass noClass").addClass("yourClass")
```

可以接收一个函数

```js
d("ul li").addClass(function (index) {
  return "item-" + index
})
```

给定一个包含两个元素的无序列表`<li>`，此示例将类“item-0”添加到第一个元素`<li>`，将类“item-1”添加到第二个元素。
