# d.isWeakSet()

## d.isWeakSet( value )

- **返回:** [Boolean](/reference/Types#boolean)

判断值是[WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/WeakSet)。

### d.isWeakSet( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数

```js
d.isWeakSet(new WeakSet()) // => true
d.isWeakSet([]) // => false
```
