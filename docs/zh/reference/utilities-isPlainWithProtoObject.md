# d.isPlainWithProtoObject()

## d.isPlainWithProtoObject( value )

- **返回:** [Boolean](/reference/Types#boolean)

判断值是普通对象,但是不包含没有原型的普通对象。

> [!WARNING]
> 相对于[d.isPlainObject()](/reference/utilities-isPlainObject)的范围它更小。

### d.isPlainWithProtoObject( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 任意类型的参数

```js
d.isPlainObject({ x: 0, y: 0 }) // => true
d.isPlainObject(Object.create(null)) // => false
d.isPlainObject(new Object()) // =>  true
```

为何会有这个方法的存在？

字面量 / new Object 创建的对象,都是有原型的，可以访问 `Object.prototype` 上的方法，比如：

```js
obj1.toString() // "[object Object]"
obj1.hasOwnProperty("x") // true
```

因此如果你使用jQuery的`$.isPlainObject()`判断它是否是对象,然后调用了原型上的方法就会报错。
该方法就是为了弥补不足，也许您更应该把`$.isPlainObject()`中的方法替换成`d.isPlainWithProtoObject()`来确保不会发生一些意外情况。
