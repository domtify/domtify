# d.setIn()

## d.setIn( object, path, value )

- **返回:** [Object](/reference/Types#object)

在对象的指定路径上设置值。
如果路径中的某一部分不存在，则会自动创建。
对于缺失的索引属性，会创建数组；而对其他缺失的属性，则会创建对象。

> [!NOTE]
> 此方法会修改原对象。

### d.setIn( object, path, value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **object**
  - **类型:** [Object](/reference/Types#object)
  - **描述:** 要修改的对象。
- **path**
  - **类型:** [Array](/reference/Types#array)|[String](/reference/Types#string)
  - **描述:** 要设置的属性路径。
- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 要设置的值

对于修改深度对象时，该函数特别实用。

例子：

```js
const object = { a: [{ b: { c: 3 } }] }

d.setIn(object, "a[0].b.c", 4)
console.log(object.a[0].b.c)
// => 4

d.setIn(object, ["x", "0", "y", "z"], 5)
console.log(object.x[0].y.z)
// => 5
```
