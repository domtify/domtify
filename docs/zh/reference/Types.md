# 类型

本页记录了domtify文档中出现的一些数据类型的说明,对于数据类型的更详细的说明可以参考:[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Data_structures)、[ECMAScript Language Types](https://262.ecma-international.org/7.0/#sec-ecmascript-language-types)。

## Integer

整数是普通的 Number 类型，但每当明确提及时，表示期望的是一个非浮点数。

## Element

文档对象模型 (DOM) 中的元素可以包含属性、文本和子元素

## domtify

domtify 对象包含一组文档对象模型 (DOM) 元素，这些元素由 HTML 字符串创建或从文档中选择

## Array

JavaScript 中的数组是带有一些内置方法的可变列表。你可以使用数组字面量来定义数组：

```js
let x = []
let y = [1, 2, 3]
```

数组的类型是 "object"：

```js
typeof [] // "object"
typeof [1, 2, 3] // "object"
```

读取和写入数组元素使用数组表示法：

```js
x[0] = 1
y[2] // 3
```

## ArrayLikeObject

无论是真正的 JavaScript 数组，还是一个包含非负整数 `length` 属性并且具有从 `0` 到 `length - 1` 索引属性的 JavaScript 对象。后一种情况包括在 Web 开发中常见的类数组对象，例如函数的 `arguments` 对象，以及许多 DOM 方法返回的 `NodeList` 对象。

当 domtify 的 API 同时接受普通对象或类数组对象时，如果一个普通对象带有数值型的 `length` 属性，它会被当作类数组对象来处理。

## String

JavaScript 中的字符串是一种不可变的原始值，可以包含零个、一个或多个字符。

```txt
"I'm a String in JavaScript!"
'So am I!'
```

## Function

JavaScript 中的函数可以是命名函数，也可以是匿名函数。任何函数都可以赋值给变量或传递给方法，但以这种方式传递成员函数可能会导致它们在另一个对象的上下文中被调用（即使用不同的 this 对象）。

```js
function named() {}
let handler = function () {}
```

您会在 domtify 代码中看到很多匿名函数：

```js
d("a").on("click", function () {})
```

函数的类型是“function”(`type of`)。

## Boolean

JavaScript 中的布尔值可以是真也可以是假：

```js
if (true) console.log("always!")
if (false) console.log("never!")
```

## Selector

包含一个或多个要匹配的选择器的字符串。此字符串必须是有效的 CSS 选择器字符串。

具体即可参考：

- https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector#selectors
- https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_selectors
- https://drafts.csswg.org/selectors/

## Object

在 JavaScript 中，一切都是对象，尽管有些更“客观”（哈哈）。创建对象最简单的方法是对象字面量：

```js
let x = {}
let y = {
  name: "Pete",
  age: 15,
}
```

对象的类型是 "object"：

```js
typeof {} // "object"
```

## PlainObject

PlainObject类型是一个包含零个或多个键值对的JavaScript对象。换句话说，普通对象就是一个Object对象。在domtify文档中将其称为"普通"是为了将其与其他类型的JavaScript对象区分开来：例如，`null`、用户定义的数组和`document`对象，所有这些对象的`typeof`值都是`"object"`。`d.isPlainObject()`方法可以识别传入的参数是否为普通对象，如下所示：

```js
let a = []
let d = document
let o = {}

typeof a // object
typeof d // object
typeof o // object

d.isPlainObject(a) // false
d.isPlainObject(d) // false
d.isPlainObject(o) // true
```

## Number

JavaScript中的数字是双精度64位格式的IEEE 754值。它们是不可变的原始值，就像[字符串](#string)一样。所有在基于c的语言中常见的运算符都可用于处理数字（+、-、_、/、%、=、+=、-=、_=、/=、++、--）。

```text
12
3.543
```

数字的`type of`返回结果是"number"。

```js
typeof 12 // "number"
typeof 3.543 // "number"
```

## htmlString

带有标签开始标记`<`的字符串就是`htmlString`

```js
const str1 = `<p>hello domtify!</p>` // 是 htmlString
const str1 = "hello domtify!" // 不是
```

## ResizeObserverEntry

[ResizeObserverEntry](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserverEntry) 是[ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)回调对象的类型,包含被观察元素及其尺寸信息。

```js
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    console.log(entry instanceof ResizeObserverEntry) // true
    console.log(entry.target) // 被观察的元素
    console.log(entry.contentRect.width, entry.contentRect.height)
  }
})
```

## Void

在 TS 里，[void](https://www.typescriptlang.org/docs/handbook/2/functions.html#void) 是类型，表示没有有意义的返回值

常用于函数的返回类型注解，例如：

```js
function log(message: string): void {
  console.log(message);
}
```

> [!TIP]
> 实际上,在大多数编程语言里，`void` 都有类似的含义，表示“没有返回值”，通常用来声明函数不返回任何有意义的值。

## Null

`null`是JavaScript关键字，通常用于表达不存在有意的值。

## Anything

用于表示任意类型

## undefined

Undefined 类型只有一个值，即 `undefined`。任何尚未被赋值的变量，其值都是 `undefined`。

## NaN

一个数值，该数值为 IEEE 754-2008 标准中定义的 _NaN（Not-a-Number，非数字）_ 值。

## Event

domtify的事件系统和jQuery的[事件](https://api.jquery.com/Types/#Event)系统有所不同,它并没有内部模拟一个事件接口,而是原生的事件[接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)

结合代码更好的理解

```js
document.querySelector(".foo").addEventListener("click", function (event) {
  console.log("clicked!")
})

d(".foo").on("click", function (event) {
  console.log("clicked!")
})
```

上述代码中,`event`它是相等的,也就是说`event instanceof Event`都是为`true`。

## DomtifyEvent

domtify的事件系统中,[trigger](/reference/method-trigger)方法主动触发时，事件句柄中的回调事件对象,它是继承于[CustomEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent/CustomEvent)构造函数实现的。
