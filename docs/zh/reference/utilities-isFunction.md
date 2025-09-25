# d.isFunction()

## d.isFunction( value )

- **返回:** [Boolean](/reference/Types#boolean)

判断值是函数。

### d.isFunction( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数

```js
function stub() {}

d.isFunction(function () {}) // => true
d.isFunction({ x: 15, y: 20 }) // => false
d.isFunction(null) // => false
d.isFunction(stub) // => true
d.isFunction("function") // => false
```
