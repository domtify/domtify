# .position()

## .position()

- **返回:** [Object](/reference/Types#object)

获取当前元素相对于其最近的已定位（非static）的祖先元素的位置

### .position() <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **该方法不需要任何参数**

`.position()`返回一个包含`top`和`left`的对象。与 `.offset()` 的区别是相对于其最近的已定位（非static）的祖先元素，而`.offset()`返回相对于 document 的位置。

例子：

想象有以下html代码片段：

```html
<div id="parent" style="position: relative">
  <div class="child" style="position: absolute; top: 10px; left: 20px"></div>
</div>
```

使用该方法获取最近的已定位父级的位置:

```js
d(".child").position()
```

得到的结果如下

```js
{
    "top": 10,
    "left": 20
}
```
