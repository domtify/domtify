# .removeClass()

从匹配元素集合中的每个元素中移除单个类、多个类或所有类。

## .removeClass( className )

- **返回:** [domtify](/reference/Types#domtify)

从匹配元素集合中的每个元素中移除单个类或多个类。

### .removeClass( className ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **className**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 要从每个匹配元素的类属性中删除一个或多个以空格分隔的类。

### .removeClass( classNames ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **classNames**
  - **类型:** [Array](/reference/Types#array)
  - **描述:** 要从每个匹配元素的类属性中删除的类数组。

### .removeClass( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [String](/reference/Types#string) currentClassName ) => [String](/reference/Types#string)
  - **描述:** 返回一个或多个待移除的类名（以空格分隔）。该函数接收集合中元素的索引位置和旧类名作为参数。

### .removeClass( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [String](/reference/Types#string) currentClassName ) => [String](/reference/Types#string) | [Array](/reference/Types#array)
  - **描述:** 返回一个或多个空格分隔的类名，或返回一个待移除类名数组的函数。该函数接收集合中元素的索引位置和旧类值作为参数。

可以从匹配元素集合中一次删除多个类（用空格分隔），如下所示：

```js
d("p").removeClass("myClass yourClass")
```

此方法通常用于`.addClass()`将元素的类从一个切换到另一个，如下所示：

```js
d("p").removeClass("myClass noClass").addClass("yourClass")
```

在这里，myClass 和 noClass 类从所有段落中被移除，而 yourClass 被添加。

要用另一个类替换所有现有的类，我们可以使用 `.attr( "class", "newClass" )` 来代替。

该`.removeClass()`方法允许我们通过传入一个函数来指示要删除的类。

```js
d("li").removeClass(function (index) {
  return index % 2 === 0 ? "even" : "odd"
})
```

这个示例表示偶数索引移除 "even" 类，奇数移除 "odd" 类
