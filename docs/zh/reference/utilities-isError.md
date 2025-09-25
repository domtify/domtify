# d.isError()

## d.isError( value )

- **返回:** [Boolean](/reference/Types#boolean)

判断值是[Error](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)对象

### d.isError( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数

```js
d.isError(new Error()) // => true
d.isError(new TypeError()) // => true
d.isError(new ReferenceError()) // => true

d.isError({}) // => false
d.isError("error") // => false
d.isError(null) // => false
```
