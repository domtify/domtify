# .removeData()

## .removeData( [name ] )

- **返回:** [domtify](/reference/Types#domtify)

删除[.data()](/reference/method-data)方法存储的数据。

### .removeData( [name ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **name**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 数据存储时的key,支持空格分割批量传入

### .removeData( [list ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **list**
  - **类型:** [Array](/reference/Types#array) | [String](/reference/Types#string)
  - **描述:** 支持通过数组的方式传入要删除的key

该`.removeData()`方法允许我们删除之前使用`.data()`方法设置的值。当使用键名调用时，`.removeData()`将删除该特定值。当不使用任何参数调用时，`.removeData()`将删除所有值。

```js
d("div").data("test1", "VALUE-1")

// 删除指定键"test1"
d("div").removeData("test1")
d("div").data("test1") // undefined
```
