# d.isPrimitive()

## d.isPrimitive( value )

- **返回:** [Boolean](/reference/Types#boolean)

判断值是原始类型。

> [!TIP]
> 在 JavaScript 中，数据类型可以分为 两大类：原始类型(Primitive types) 和 引用类型(Reference types，也叫对象类型)。

### d.isPrimitive( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数

示例：

```js
d.isPrimitive("hello") // => true
d.isPrimitive(123) // => true
d.isPrimitive(true) // => true
d.isPrimitive(null) // => true
d.isPrimitive(undefined) // => true
d.isPrimitive(Symbol()) // => true
d.isPrimitive(10n) // => true (BigInt)

d.isPrimitive({}) // => false
d.isPrimitive([]) // => false
d.isPrimitive(new Date()) // => false
```
