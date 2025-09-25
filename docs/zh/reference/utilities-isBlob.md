# d.isBlob()

## d.isBlob( value )

- **返回:** [Boolean](/reference/Types#boolean)

判断值是[Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)对象。

### d.isBlob( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数

```js
d.isBlob(new Blob()) // => true

d.isBlob({}) // => false
d.isBlob([]) // => false
d.isBlob(null) // => false
```
