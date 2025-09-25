# d.isType()

## d.isType( value )

- **返回:** [Boolean](/reference/Types#boolean)

判断值属于指定类型。

### d.isType( value,typeName ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数
- **typeName**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 目标类型名称，如 `"String"`、`"Number"`、`"Array"`、`"Null"` 等

例子：

```js
d.isType("hello", "String") // => true
d.isType(123, "Number") // => true
d.isType([], "Array") // => true
d.isType({}, "Object") // => true
d.isType(null, "Null") // => true
d.isType(undefined, "Undefined") // => true

d.isType("123", "Number") // => false
d.isType([], "Object") // => false
```
