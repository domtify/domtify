# d.param()

## d.param( obj )

- **返回:** [String](/reference/Types#string)

创建一个数组、普通对象或 domtify 对象的序列化表示形式，使其适合用于 URL 查询字符串或 Ajax 请求。如果传入的是 domtify 对象，那么它应当包含带有 `name`/`value` 属性的输入元素。

### d.param( obj ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **obj**
  - **类型:** [Array](/reference/Types#array) | [PlainObject](/reference/Types#plainobject) | [domtify](/reference/Types#domtify)
  - **描述:** 要序列化的数组、普通对象或 domtify 对象。

### d.param( obj, traditional ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **obj**
  - **类型:** [Array](/reference/Types#array) | [PlainObject](/reference/Types#plainobject) | [domtify](/reference/Types#domtify)
  - **描述:** 要序列化的数组、普通对象或 domtify 对象。
- **traditional**
  - **类型:** [Boolean](/reference/Types#boolean)
  - **描述:** 一个布尔值，指示是否执行传统的「浅层」序列化。

`d.param` 方法的作用是：**把对象或数组序列化成 URL 查询字符串。**
