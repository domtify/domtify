# d.extend()

## d.extend( target, object1 [, objectN ] )

- **返回:** [Object](/reference/Types#object)

将两个或多个对象的内容合并到第一个对象中。

### d.extend( target, object1 [, objectN ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **target**
  - **类型:** [Object](/reference/Types#object)
  - **描述:** 将接收新属性的对象。
- **object1**
  - **类型:** [Object](/reference/Types#object)
  - **描述:** 包含要合并的附加属性的对象。
- **objectN**
  - **类型:** [Object](/reference/Types#object)
  - **描述:** 包含要合并的属性的附加对象。

### d.extend( [deep ], target, object1 [, objectN ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **deep**
  - **类型:** [Boolean](/reference/Types#boolean)
  - **描述:** 如果为 `true`，合并将变为递归（也称深拷贝）。不支持为该参数传入 `false`。
- **target**
  - **类型:** [Object](/reference/Types#object)
  - **描述:** 要扩展的对象。它将接收新的属性。
- **object1**
  - **类型:** [Object](/reference/Types#object)
  - **描述:** 包含要合并的附加属性的对象。
- **objectN**
  - **类型:** [Object](/reference/Types#object)
  - **描述:** 包含要合并的属性的附加对象。

开发插件时最常用的方法,主要用于合并用户传入的参数和默认值。

递归合并两个对象，修改第一个对象。

```js
const object1 = {
  apple: 0,
  banana: { weight: 52, price: 100 },
  cherry: 97,
}
const object2 = {
  banana: { price: 200 },
  durian: 100,
}

// 递归地将 `object2` 合并到 `object1` 中。
d.extend(true, object1, object2)
```

合并默认值和选项，而不修改默认值。这是一种常见的插件开发模式。

```js
const defaults = { validate: false, limit: 5, name: "foo" }
const options = { validate: true, name: "bar" }

// 合并默认值与选项，且不修改默认值。
const settings = d.extend({}, defaults, options)
```
