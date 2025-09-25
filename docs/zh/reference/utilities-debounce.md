# d.debounce()

## d.debounce( func, wait,options )

- **返回:** [Function](/reference/Types#function)

创建一个防抖函数，该函数会在上一次调用后 **等待 `wait` 毫秒** 才执行 `func`。

### d.debounce( func, wait,options ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **func**
  - **类型:** [Function](/reference/Types#function)
  - **描述:** 需要防抖处理的函数。
- **wait(default:`0`)**
  - **类型:** [Number](/reference/Types#number)
  - **描述:** 延迟的毫秒数。
- **options**
  - **类型:** [PlainObject](/reference/Types#plainobject)
  - **描述:** 配置对象。
    - **\[options.leading=false] (boolean)**：是否在延迟开始时调用一次 `func`。
    - **\[options.maxWait] (number)**：在被调用前允许延迟的最大时间。
    - **\[options.trailing=true] (boolean)**：是否在延迟结束时调用一次 `func`。

防抖函数具有以下方法：

- **`cancel`**：取消延迟中的函数调用。
- **`flush`**：立即执行延迟中的函数调用。

可以通过 `options` 参数控制：

- **leading**（默认 `false`）：是否在延迟开始时调用一次 `func`。
- **trailing**（默认 `true`）：是否在延迟结束时调用一次 `func`。

`func` 会接收最近一次调用时传入的参数，并返回上一次执行的结果。

> [!WARNING]
> 当 `leading` 和 `trailing` 同时为 `true` 时，只有在等待期间多次调用时，`func` 才会在延迟结束时（trailing edge）再次触发。

如果 `wait` 为 `0` 且 `leading` 为 `false`，`func` 的调用会被推迟到下一次事件循环（效果类似 `setTimeout(fn, 0)`）。

该助手特别有用。因此domtify内置了此功能。我们看以下例子：

```js
// 当窗口大小不断变化时，避免进行高开销的计算。
d(window).on("resize", d.debounce(calculateLayout, 150))

// 点击时调用 `sendSms`，并防抖后续的点击调用。
d(selector).on(
  "click",
  d.debounce(sendSms, 300, {
    leading: true,
    trailing: false,
  }),
)
```
