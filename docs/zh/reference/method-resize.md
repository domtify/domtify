# .resize()

在jQuery中[.resize()](https://api.jquery.com/resize-shorthand/#resize-handler)方法表示附加`resize`事件到元素,在jQuery3.3版本中已经被弃用,在未来的版本中可能会被删除。

> [!WARNING]
> 在`domtify`中`.resize()`方法对于jQuery中的所表示的意义同样也是被弃用的。在`domtify`中该方法会保留，并赋予新的意义。

元素集合中元素的尺寸发生改变时触发回调,或者移除元素的尺寸改变时的回调行为。

## .resize(function, options)

- **返回:** [domtify](/reference/Types#domtify)

元素的尺寸改变时触发回调

例子：

```html
<style>
  .resizable {
    resize: both; /* 允许水平和垂直方向同时缩放 */
    overflow: auto; /* 必须有 overflow 才能生效 */
    width: 200px;
    height: 150px;
    background: lightblue;
    border: 2px solid #333;
  }
</style>

<div class="resizable"></div>
<div class="resizable"></div>
```

把该方法附加到元素上

```js
d(".resizable").resize(function (index, entry) {
  d(this).html(`
        <span>高：${entry.contentRect.height}</span>
        <span>宽：${entry.contentRect.width}</span>
        `)
})
```

此时你手动拖动元素改变尺寸,就能看到如果尺寸改变会把当前的尺寸显示到元素上

![resize演示](/resize.png)

### .resize(function, options) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [ResizeObserverEntry](/reference/Types#resizeobserverentry) entry ) => [Void](/reference/Types#void)
  - **描述:** 该方法没有返回值，`this`是当前元素,形参的第二个参数是一个`ResizeObserverEntry`对象实例,可以通过该对象拿到当前元素的尺寸信息，比如：`entry.contentRect.width`, `entry.contentRect.height`
- **options**
  - **类型:** [Object](/reference/Types#object)
  - **描述:** 配置监听的行为,它支持以下配置选项
    ```js
    {
        //监听类型,默认"both",宽高变化都会监听,也支持只监听width、height
        type: "height",
        // 是否首次运行
        immediate: false,
    }
    ```

## .resize(null)

- **返回:** [domtify](/reference/Types#domtify)

移除元素的尺寸改变时的回调行为。

### .resize(null) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **null**
  - **类型:** [Null](/reference/Types#null)
  - **描述:** 让元素尺寸改变时不再触发回调,可以简单理解为"类似解除事件的绑定"

使用方式也很简单

```js
d(".resizable").resize(null)
```
