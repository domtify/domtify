# d.isEmptyObject()

## d.isEmptyObject( value )

- **返回:** [Boolean](/reference/Types#boolean)

判断值是一个空对象。

### d.isEmptyObject( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数

```js
d.isEmptyObject({}) // => true
d.isEmptyObject({ foo: "bar" }) // => false
```
