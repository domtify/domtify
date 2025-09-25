# d.parseHTML()

## d.parseHTML( data [, context ] [, keepScripts ] )

- **返回:** [Array](/reference/Types#array)

将字符串解析为 DOM 节点数组。

### d.parseHTML( data [, context ] [, keepScripts ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **data**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 要被解析的HTML字符串。
- **context(default: `null`)**
  - **类型:** [Null](/reference/Types#null)|[Element](/reference/Types#element)
  - **描述:** 文档元素作为创建 HTML 片段的上下文。
- **keepScripts(default: `false`)**
  - **类型:** [Boolean](/reference/Types#boolean)
  - **描述:** 布尔值，指示是否包含 HTML 字符串中传递的脚本

该方法将html字符串解析为dom节点。

例子：

```js
const res = d("<b>hello</b>domtify!<span>nice</span>")
```

打印结果会在集合中看到三个dom元素,分别是b、text、span。
