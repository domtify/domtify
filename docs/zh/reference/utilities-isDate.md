# d.isDate()

## d.isDate( value )

- **返回:** [Boolean](/reference/Types#boolean)

判断值是日期。

### d.isDate( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数

```js
d.isDate(new Date()) // => true
d.isDate(new Date("invalid date")) // => false
```
