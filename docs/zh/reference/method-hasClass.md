# .hasClass()

## .hasClass( className )

- **返回:** [Boolean](/reference/Types#boolean)

确定是否有任何匹配的元素被分配了给定的类。

### .hasClass( className ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **className**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 要搜索的类名。

元素可能被分配了多个类。在 HTML 中，这是通过用空格分隔类名来表示的：

```HTML
<div id="mydiv" class="foo bar"></div>
```

如果类被分配给元素，`.hasClass()` 方法将返回 `true`，即使还有其他类也是如此。例如，给定上面的 HTML，以下将返回 `true`：

```js
d("#mydiv").hasClass("foo")
```

同样：

```js
d("#mydiv").hasClass("bar")
```

而这个将返回 `false`：

```js
d("#mydiv").hasClass("quux")
```
