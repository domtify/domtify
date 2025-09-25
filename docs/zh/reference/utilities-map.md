# d.map()

## d.map( array, callback )

- **返回:** [Array](/reference/Types#array)

将数组或对象中的所有项目转换为新的项目数组。

### d.map( array, callback ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **array**
  - **类型:** [ArrayLikeObject](/reference/Types#arraylikeobject)
  - **描述:** 数组或类似数组的对象。
- **callback**
  - **类型:** [Function](/reference/Types#function)( [Object](/reference/Types#object) elementOfArray, [Integer](/reference/Types#integer) indexInArray ) => [Object](/reference/Types#object)
  - **描述:** 用于处理每个元素的函数。该函数的第一个参数是数组中的元素，第二个参数是元素在数组中的索引。函数可以返回任意值。如果返回的是一个数组，该数组会被展平（flatten）并加入到最终的结果数组中。在函数内部，`this` 指向全局对象（`window`）。

### d.map( object, callback ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **object**
  - **类型:** [Object](/reference/Types#object)
  - **描述:** 非数组或类似数组的对象。
- **callback**
  - **类型:** [Function](/reference/Types#function)( [Object](/reference/Types#object) propertyOfObject, [String](/reference/Types#string) key ) => [Object](/reference/Types#object)
  - **描述:** 用于处理每个元素的函数。函数的第一个参数是 **值**，第二个参数是对象属性的 **键**。
    函数可以返回任意值并将其添加到数组中。返回的数组会被 **展平**（flatten）到结果数组中。
    在函数内部，`this` 指向 **全局对象**（`window`）。
