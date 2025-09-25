# .prop()

获取匹配元素集合中第一个元素的属性值或为每个匹配元素设置一个或多个属性。

## .prop( propertyName )

- **返回:** [Anything](/reference/Types#anything)

获取匹配元素集合中第一个元素的属性值。

### .prop( propertyName ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **propertyName**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 要获取的属性的名称。

`.prop()`方法仅获取匹配集合中第一个元素的属性值。如果属性值尚不存在，或者匹配集合中没有元素，则该方法返回`undefined`

## .prop( propertyName, value )

- **返回:** [domtify](/reference/Types#domtify)

为匹配元素集合设置一个或多个属性。

### .prop( propertyName, value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **propertyName**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 要设置的属性的名称。
- **value**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 为属性设置的值。

### .prop( properties ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **properties**
  - **类型:** [PlainObject](/reference/Types#plainobject)
  - **描述:** 要设置的属性值对的对象。

### .prop( propertyName, function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **propertyName**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 要设置的属性的名称。
- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [Anything](/reference/Types#anything) oldPropertyValue ) => [Anything](/reference/Types#anything)
  - **描述:** 返回要设置的值的函数。接收集合中元素的索引位置和旧属性值作为参数。在函数中，关键字`this`表示当前元素。

该`.prop()`方法是一种设置属性值的便捷方式,尤其是在设置多个属性、使用函数返回的值或同时设置多个元素的值时。
