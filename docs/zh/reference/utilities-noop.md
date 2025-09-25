# d.noop()

## d.noop( )

- **返回:** [undefined](/reference/Types#undefined)

一个空函数

### d.noop() <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **该方法没有参数**

当你需要传递一个**什么也不做的函数**时，可以使用这个空函数。
这对插件作者来说很有用,当他们提供可选的回调函数时，如果用户没有传入回调，就可以执行类似 `d.noop` 这样的空函数。
