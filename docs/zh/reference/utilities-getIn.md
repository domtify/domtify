# d.getIn()

## d.getIn( object, path [, defaultValue ] )

- **返回:** [Anything](/reference/Types#anything)

在对象的指定路径上获取值。
如果解析出的值为 `undefined`，则返回 defaultValue。

### d.getIn( object, path [, defaultValue ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **object**
  - **类型:** [Object](/reference/Types#object)
  - **描述:** 要查询的对象。
- **path**
  - **类型:** [Array](/reference/Types#array)|[String](/reference/Types#string)
  - **描述:** 要获取的属性路径。
- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 解析得到的值，或者默认值。

例子：

```js
const object = { a: [{ b: { c: 3 } }] }

d.getIn(object, "a[0].b.c")
// => 3

d.getIn(object, ["a", "0", "b", "c"])
// => 3

d.getIn(object, "a.b.c", "default")
// => 'default'
```
