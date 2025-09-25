# d.isFile()

## d.isFile( value )

- **返回:** [Boolean](/reference/Types#boolean)

判断值是[File](https://developer.mozilla.org/zh-CN/docs/Web/API/File)对象

### d.isFile( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数

```js
d.isFile(new File([""], "", { type: "text/html" })) // => true

d.isFile({}) // => false
d.isFile([]) // => false
d.isFile(null) // => false
```
