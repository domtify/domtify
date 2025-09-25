# .offsetParent()

## .offsetParent()

- **返回:** [domtify](/reference/Types#domtify)

获取已定位的最近祖先元素。

### .offsetParent() <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **该方法不需要任何参数**

给定一个代表一组 DOM 元素的 domtify 对象，`.offsetParent()` 方法允许我们在这些元素的祖先节点中进行搜索，并构造一个新的 domtify 对象，该对象封装了距离最近的“已定位”的祖先元素。

当一个元素的 CSS `position` 属性为 `relative`、`absolute` 或 `fixed` 时，就称它是“已定位”的元素。

这些信息在计算偏移量（offset）、往在页面上放置对象时非常有用。

例子：

```html
<ul class="level-1">
  <li class="item-i">I</li>
  <li class="item-ii" style="position: relative;">
    II
    <ul class="level-2">
      <li class="item-a">A</li>
      <li class="item-b">
        B
        <ul class="level-3">
          <li class="item-1">1</li>
          <li class="item-2">2</li>
          <li class="item-3">3</li>
        </ul>
      </li>
      <li class="item-c">C</li>
    </ul>
  </li>
  <li class="item-iii">III</li>
</ul>
```

如果我们从项目 A 开始，我们可以找到它的定位祖先：

```js
d("li.item-a").offsetParent().css("background-color", "red")
```

`li.item-ii`项目背景会变红。
