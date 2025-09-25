# .scrollLeft()

## .scrollLeft( )

- **返回:** [Number](/reference/Types#number)

获取匹配元素集合中第一个元素的滚动条的当前水平位置。

### .scrollLeft( ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **该方法需要参数**

获取水平方向(X轴)的滚动像素距离。如果滚动条位于最左侧，或者元素不可滚动，则此数字为`0`。

例子：

```html
<style>
  p {
    margin: 10px;
    padding: 5px;
    border: 2px solid #666;
  }
</style>

<p>Hello</p>

<script>
  const top = $("p").scrollLeft() //0
</script>
```

## .scrollLeft( value )

- **返回:** [domtify](/reference/Types#domtify)

设置每个匹配元素集合的滚动条的当前水平位置。

### .scrollLeft( value ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **value**
  - **类型:** [Number](/reference/Types#number)
  - **描述:** 指示设置滚动条的新位置的数字。

### .scrollLeft( function ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [Number](/reference/Types#number) old ) => [Number](/reference/Types#number)
  - **描述:** 函数返回一个数值用于设置新的距离。

例子：

```html
<style>
  div.demo {
    background: #ccc none repeat scroll 0 0;
    border: 3px solid #666;
    margin: 5px;
    padding: 5px;
    position: relative;
    width: 200px;
    height: 100px;
    overflow: auto;
  }
  p {
    margin: 10px;
    padding: 5px;
    border: 2px solid #666;
    width: 1000px;
    height: 1000px;
  }
</style>

<div class="demo">
  <h1>lalala</h1>
  <p>Hello</p>
</div>
```

直接设置新的滚动高度:

```js
d("div.demo").scrollLeft(300)
```

也可以传入一个函数:

```js
d("div.demo").scrollLeft((i, old) => old + 100)
```
