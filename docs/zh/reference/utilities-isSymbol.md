# d.isSymbol()

## d.isSymbol( value )

- **返回:** [Boolean](/reference/Types#boolean)

判断值是 [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 类型。

### d.isSymbol( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数

```js
d.isSymbol(Symbol()) // => true
d.isSymbol(Symbol("foo")) // => true

d.isSymbol("foo") // => false
d.isSymbol(123) // => false
d.isSymbol(null) // => false
d.isSymbol(undefined) // => false
```
