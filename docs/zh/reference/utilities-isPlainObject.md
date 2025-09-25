# d.isPlainObject()

## d.isPlainObject( value )

- **返回:** [Boolean](/reference/Types#boolean)

判断值是普通对象。

### d.isPlainObject( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数

```js
d.isPlainObject({ x: 0, y: 0 }) // => true
d.isPlainObject(Object.create(null)) // => true
d.isPlainObject(new Object()) // =>  true
```
