# d.throttle()

## d.throttle( func, wait,options )

- **返回:** [Function](/reference/Types#function)

创建一个节流函数，该函数在 **每隔 `wait` 毫秒内最多只会调用一次 `func`**。

### d.throttle( func, wait,options ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **func**
  - **类型:** [Function](/reference/Types#function)
  - **描述:** 需要节流处理的函数。
- **wait(default:`0`)**
  - **类型:** [Number](/reference/Types#number)
  - **描述:** 调用间隔的毫秒数。
- **options**
  - **类型:** [PlainObject](/reference/Types#plainobject)
  - **描述:** 配置对象。
    - **\[options.leading=true] (boolean)**：指定是否在超时的前沿调用函数。
    - **\[options.trailing=true] (boolean)**：指定是否在超时的后沿调用函数。

节流函数具有以下方法：

- **`cancel`**：取消延迟中的函数调用。
- **`flush`**：立即执行延迟中的函数调用。

可以通过 `options` 参数控制：

- **leading**（默认 `true`）：是否在延迟开始时调用一次 `func`。
- **trailing**（默认 `true`）：是否在延迟结束时调用一次 `func`。

`func` 会接收最近一次调用时传入的参数，并返回上一次执行的结果。

> [!WARNING] 注意
> 当 `leading` 和 `trailing` 同时为 `true` 时，只有在等待期间节流函数被调用了多次，`func` 才会在延迟结束时（trailing edge）再次触发。

如果 `wait` 为 `0` 且 `leading` 为 `false`，`func` 的调用会被推迟到下一次事件循环（效果类似 `setTimeout(fn, 0)`）。

节流函数也非常有用，看下面几个例子：

```js
// 避免在滚动过程中频繁更新位置。
d(window).on("scroll", d.throttle(updatePosition, 100))
```
