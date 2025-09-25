# .replaceClass()

## .replaceClass( oldClassName, newClassName)

- **返回:** [domtify](/reference/Types#domtify)

将匹配集合中的元素旧的类名替换成新的类名。

> [!NOTE]
> 该方法不存在于jQuery的api中,是domtify中独有的方法,根据jQuery的api设计风格以及[replace](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/replace)API设计而来。

### .replaceClass( oldClassName, newClassName) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **oldClassName**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 要被替换的旧的类名
- **newClassName**
  - **类型:** [String](/reference/Types#string) | [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [String](/reference/Types#string) currentClassName ) => [String](/reference/Types#string)
  - **描述:** 要替换的类名,如果是函数,该函数接收集合中元素的索引位置和现有类名作为参数。在函数内部，`this`引用集合中的当前元素

### .replaceClass( classNames) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **classNames**
  - **类型:** [PlainObject](/reference/Types#plainobject)
  - **描述:** 可以通过传入对象方式批量替换,`key`代表`oldClassName`,`value`代表`newClassName`。

### .replaceClass( classNames) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **classNames**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [String](/reference/Types#string) currentClassName ) => [PlainObject](/reference/Types#plainobject)
  - **描述:** 该函数接收集合中元素的索引位置和现有类名作为参数。在函数内部，`this`引用集合中的当前元素,返回一个`key`是`oldClassName`，`value`是`newClassName`的对象。
