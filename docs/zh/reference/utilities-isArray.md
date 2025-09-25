# d.isArray()

## d.isArray( value )

- **返回:** [Boolean](/reference/Types#boolean)

判断值是数组。

> [!WARNING]
> 该方法在jQuery的3.2版本被[弃用](https://api.jquery.com/jQuery.isArray/#jQuery-isArray-obj),在4.0版本中将会被彻底移除,并且官方建议我们使用[Array.isArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)方法代替。但是在domtify中会被保留,因为它和其它判断类型的方法风格保持一致,同时也更简短。

### d.isArray( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数

看一些例子

```js
// 下面的函数调用都返回 true
d.isArray([])
d.isArray([1])
d.isArray(new Array())
d.isArray(new Array("a", "b", "c", "d"))
d.isArray(new Array(3))
// 鲜为人知的事实：其实 Array.prototype 也是一个数组：
d.isArray(Array.prototype)

// 下面的函数调用都返回 false
d.isArray()
d.isArray({})
d.isArray(null)
d.isArray(undefined)
d.isArray(17)
d.isArray("Array")
d.isArray(true)
d.isArray(false)
d.isArray(new Uint8Array(32))
// 这不是一个数组，因为它不是使用数组字面量语法或 Array 构造函数创建的
d.isArray({ __proto__: Array.prototype })
```
