# .offset()

获取第一个元素的当前坐标，或设置匹配元素集合中每个元素相对于文档的坐标。

## .offset()

- **返回:** [domtify](/reference/Types#domtify)

获取匹配元素集合中第一个元素相对于文档的当前坐标。

### .offset() <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **该方法不需要任何参数**

`.offset()`返回一个包含`top`和`left`的对象。

## .offset( coordinates )

- **返回:** [domtify](/reference/Types#domtify)

设置匹配元素集合中每个元素相对于文档的当前坐标。

### .offset( coordinates ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **coordinates**
  - **类型:** [PlainObject](/reference/Types#plainobject)
  - **描述:** 包含`top`、`left`属性的对象，它们是指示元素新的顶部和左侧坐标的数字。

### .offset( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [PlainObject](/reference/Types#element) coords ) => [PlainObject](/reference/Types#element)
  - **描述:** 用于返回要设置的坐标的函数。接收集合中元素的索引作为第一个参数，当前坐标作为第二个参数。该函数应返回一个包含新 `top` 和 `left` 属性的对象。

给元素集合中的元素设置新的定位。

> [!WARNING]
> 如果元素的定位`position`为`static`,会显示设置`relative`以允许重新定位。
