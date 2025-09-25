# d.isInstanceOf()

## d.isInstanceOf( value ,Ctor )

- **返回:** [Boolean](/reference/Types#boolean)

判断值是指定构造函数的实例。

### d.isInstanceOf( value,Ctor ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数
- **Ctor**
  - **类型:** [Function](/reference/Types#function)
  - **描述:** 构造函数，用于判断 `args` 是否为该构造函数的实例

示例：

```js
class Foo {}
const foo = new Foo()

d.isInstanceOf(new XMLHttpRequest(), "EventTarget") // => true
d.isInstanceOf(foo, Foo) // => true
d.isInstanceOf(new Date(), Date) // => true

d.isInstanceOf({}, Foo) // => false
d.isInstanceOf(123, Number) // => false
d.isInstanceOf(null, Object) // => false
d.isInstanceOf(globalThis, ReadableStream)
```
