# d.isRegExp()

## d.isRegExp( value )

- **返回:** [Boolean](/reference/Types#boolean)

判断值是正则表达式对象。

### d.isRegExp( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数

```js
d.isRegExp(/abc/) // => true
d.isRegExp(new RegExp("abc")) // => true

d.isRegExp("abc") // => false
d.isRegExp({}) // => false
d.isRegExp(null) // => false
d.isRegExp(123) // => false
```
