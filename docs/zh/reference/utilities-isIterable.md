# d.isIterable()

## d.isIterable( value )

- **返回:** [Boolean](/reference/Types#boolean)

判断值是可迭代对象。

### d.isIterable( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数

示例：

```js
d.isIterable([]) // => true
d.isIterable("hello") // => true
d.isIterable(new Map()) // => true
d.isIterable(new Set()) // => true

d.isIterable({}) // => false
d.isIterable(123) // => false
d.isIterable(null) // => false
```
