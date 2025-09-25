# d.isNegativeNumber()

## d.isNegativeNumber( value )

- **返回:** [Boolean](/reference/Types#boolean)

判断值是负数。

### d.isNegativeNumber( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数

```js
d.isNegativeNumber(-1) // => true
d.isNegativeNumber(-3.14) // => true

d.isNegativeNumber(0) // => false
d.isNegativeNumber(1) // => false
d.isNegativeNumber("1") // => false
d.isNegativeNumber(NaN) // => false
d.isNegativeNumber(-Infinity) // => true （因为 -Infinity < 0）
```
