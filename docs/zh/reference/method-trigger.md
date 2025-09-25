# .trigger()

## .trigger( eventType [, detail ] [, options ] )

- **返回:** [domtify](/reference/Types#domtify)

手动触发事件

### .trigger( eventType [, detail ] [, options ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **eventType**
  - **类型:** [String](/reference/Types#string)
  - **描述:** on方法注册时提供的事件名称字符串
- **detail**
  - **类型:** [Anything](/reference/Types#anything)
  - **描述:** 触发时想要携带的数据,您可以使用[数组](/reference/Types#array)的方式传递多个数据
- **options**
  - **类型:** [PlainObject](/reference/Types#plainobject)
  - **描述:** 用于控制事件的行为
  ```js
  {
    // 表示该事件是否冒泡,默认值为 null: 自动根据事件类型判断是否冒泡 false:强制不冒泡 true:强制冒泡触发
    "bubbles": null,
    // 默认值为 false，表示该事件能否被取消。
    "cancelable": false,
    // 默认值为 false，指示事件是否会在影子 DOM 根节点之外触发侦听器。
    "composed": false
  }
  ```

## 用法

假定现在页面上已经绑定了如下事件：

```html
<ul>
  <li id="foo">foo</li>
  <li id="bar">bar</li>
</ul>

<script>
  d("#foo").on("click.ns2", function (event) {
    console.log("click.ns2 被触发")
  })

  d("#foo").on("click.ns1", function (event) {
    console.log("click.ns1 被触发")
  })

  d("#foo").on("click.ns1.a.b.c", function (event) {
    console.log("click.ns1.a.b.c 被触发")
  })
</script>
```

### 只触发特定命名空间的事件

```js
d("#foo").trigger("click.ns1") // 输出："click.ns1 被触发"
d("#foo").trigger("click.ns2") // 输出："click.ns2 被触发"
```

### 多级命名空间不限制顺序

```js
d("#foo").trigger("click.a.b.c")
d("#foo").trigger("click.a")
d("#foo").trigger("click.b")
d("#foo").trigger("click.c")
d("#foo").trigger("click.a.c")
```

上面的所有组合都会打印`"click.ns1.a.b.c 被触发"`

### 触发所有的点击事件

```js
d("#foo").trigger("click")
```

### 触发时传递数据

```js
d("#foo").trigger("click.ns2", "foo", "bar")

// 也支持数组的方式传递：
d("#foo").trigger("click.ns2", ["foo", "bar"])
```

那么此时监听器就可以直接接收到数据：

```js
d("#foo").on("click.ns2", function (event, arg1, arg2) {
  console.log(arg1) // "foo"
  console.log(arg2) // "bar"
})
```

### 控制事件冒泡

假如现在我们给父级也绑定了一个`click`事件：

```js
d("ul").on("click", function () {
  console.log("this is ul click!")
})
```

子元素触发`click`事件时会冒泡,我们可以通过选项来阻止冒泡：

```js
// 输出："this is ul click!" "click.ns2 被触发"
d("#foo").trigger("click.ns2")

// 只触发子元素的事件,只会输出："click.ns2 被触发"
d("#foo").trigger("click.ns2", { bubbles: false })
```

> [!WARNING]
> 细心的小伙伴可能发现了,上面的例子明明第二个参数是要传递的附加数据,这里是不是用错了？并没有用错，这是domtify支持的因为有的时候你不需要传递数据，但是又想使用选项来控制trigger的行为，这种设计很有用。

### 通过事件对象属性的方式传递数据

```js
d("#foo").trigger("click.ns2", (event) => {
  event.foo = "foo"
  event.bar = "bar"
})

// 也支持this的方式传递
d("#foo").trigger("click.ns2", function () {
  this.foo = "foo"
  this.bar = "bar"
})

// 同时依然能够通过选项控制trigger方法的行为：
d("#foo").trigger(
  "click.ns2",
  function () {
    this.foo = "foo"
    this.bar = "bar"
  },
  { bubbles: false },
)
```

那么通过这种方式传递数据,在接收时直接访问事件对象上的属性即可：

```js
d("#foo").on("click.ns2", function (event) {
  console.log(event.foo) // "foo"
  console.log(event.bar) // "bar"
})
```

### 触发自定义的事件

假定您绑定了一个自定义事件：

```js
d("#foo").on("animalfound", (event, args) => {
  console.log(args.name) // "猫" 或 "狗"
})
```

触发自定义事件并携带参数：

```js
d("#foo").trigger("animalfound", { name: "猫" })
d("#foo").trigger("animalfound", { name: "狗" })
```
