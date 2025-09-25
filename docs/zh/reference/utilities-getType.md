# d.getType()

## d.getType( value )

- **返回:** [String](/reference/Types#string)

返回值的类型。

> [!TIP]
> 返回的类型都是首字母大写的字符串

### d.getType( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数

例子：

```js
d.getType("hello") // => "String"
d.getType(123) // => "Number"
d.getType(null) // => "Null"
d.getType(undefined) // => "Undefined"
d.getType([]) // => "Array"
d.getType({}) // => "Object"
d.getType(new Date()) // => "Date"
d.getType(/abc/) // => "RegExp"
d.getType(new Set()) // => "Set"
d.getType(Symbol()) // => "Symbol"
d.getType(() => {}) // => "Function"
```
