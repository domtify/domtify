# .end()

## .end()

- **返回:** [domtify](/reference/Types#domtify)

结束当前链中最近的过滤操作，并将匹配元素集合返回到其之前的状态。

### .end() <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **该方法无需任何参数**

domtify 的大多数方法都会对一个 domtify 对象实例进行操作，并生成一个新的实例，用于匹配一组不同的 DOM 元素。当这种情况发生时，就好像新的元素集合被压入了对象内部维护的堆栈中。每次后续的过滤方法都会将一个新的元素集合压入堆栈。如果我们需要旧的元素集合，可以使用end()方法 将集合从堆栈中pop弹出。

例子：

想象有以下html片段:

```html
<p><span>Hello</span>, how are you?</p>
```

我们通过find方法找到span元素后,此时集合是span元素,如果我们想回退到`$("p")`就可以使用end方法：

```js
d("p").find("span").end().css("border", "2px red solid")

// 等价于
d("p").css("border", "2px red solid")
```

调用结果是p标签会被设置成红色边框的样式。
