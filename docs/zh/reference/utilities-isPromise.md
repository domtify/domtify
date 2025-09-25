# d.isPromise()

## d.isPromise( value )

- **返回:** [Boolean](/reference/Types#boolean)

判断值是[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)对象。

### d.isPromise( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数

```js
d.isPromise(new Promise((resolve) => {})) // => true

d.isPromise({}) // => false
d.isPromise("error") // => false
d.isPromise(null) // => false
```
