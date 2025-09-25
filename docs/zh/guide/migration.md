# 迁移指南

## 不支持被jQuery官方分类为“Internals”、“deprecated”的方法

- [Internals](https://api.jquery.com/category/internals/),既然都被标记为内部方法了那么没必要提供。
- [deprecated](https://api.jquery.com/category/deprecated/),本就被jQuery弃用的方法更不应该出现。

## 不再提供ready方法

> [!WARNING]
> 虽然该方法官方文档还没有明确的标记为删除,但是它已经明确的提出已经不再推荐使用该方法。具体查看查看[ready文档](https://api.jquery.com/ready/#ready-handler)

下面这段是jQuery官方文档原文翻译过来的内容:

jQuery 提供了几种方法来附加一个在 DOM 就绪时运行的函数。以下所有语法都是等效的：

```js
$(handler)
$(document).ready(handler)
$("document").ready(handler)
$("img").ready(handler)
$().ready(handler)
```

从 jQuery 3.0 开始，仅推荐使用第一种语法；其他语法仍然有效，但已被弃用。这是因为选择操作与`.ready()`方法的行为无关，这效率低下，并且可能导致对方法行为的错误假设。例如，第三种语法可以正常工作，但`"document"`它不选择任何内容。第四种语法等待文档准备就绪，但却（错误地）暗示它等待图像准备就绪。

另外`$(document).on( "ready", handler )`，从 jQuery 1.8 开始已弃用，并在 jQuery 3.0 中删除。请注意，如果 DOM 在附加此事件之前已准备就绪，则不会执行处理程序。

该`.ready()`方法通常与匿名函数一起使用：

```js
$(document).ready(function () {
  // Handler for .ready() called.
})
```

这相当于推荐的调用方式：

```js
$(function () {
  // Handler for .ready() called.
})
```

因此在domtify中也只推荐您使用jQuery官方推荐的方式：

```js
d(function () {
  // document文档准备就绪
})
```

## 不支持jQuery特有的魔法选择器

由于domtify底层使用的是浏览器原生的API`querySelectorAll`，因此jQuery中特有的[选择器](https://api.jquery.com/category/selectors/)domtify是不支持的。

假定现在有一个表单:

```html
<form method="post" action="">
  <fieldset>
    <div>
      <label for="two">2</label>
      <input type="checkbox" value="2" id="two" name="number[]" />
    </div>
    <div>
      <label for="four">4</label>
      <input type="checkbox" value="4" id="four" name="number[]" />
    </div>
    <div>
      <label for="six">6</label>
      <input type="checkbox" value="6" id="six" name="number[]" />
    </div>
    <div>
      <label for="eight">8</label>
      <input type="checkbox" value="8" id="eight" name="number[]" />
    </div>
  </fieldset>
</form>
```

遍历得到所有`input`元素的id属性值的数组:

```js
$(":checkbox")
  .map(function (index, domElement) {
    return this.id
  })
  .get() //['two', 'four', 'six', 'eight']
```

这在`jQuery`中是合法的,但是这在`domtify`中它只会返回一个空数组。

```js
d(":checkbox")
  .map(function (index, domElement) {
    return this.id
  })
  .get() // []
```

原因是`":checkbox"`选择器本身在`querySelectorAll()`就不受支持。因此建议您使用等效的标准css选择器:

```js
d(`input[type="checkbox"]`)
  .map(function (index, domElement) {
    return this.id
  })
  .get() //['two', 'four', 'six', 'eight']
```

> [!IMPORTANT]
> 由于`domtify`是面向未来的,因此不打算兼容这一块的内容。

## 不支持动效模块

jQuery 动效相关的[API](https://api.jquery.com/category/effects/)在现代化浏览器中是非常“笨重”的,实际上现代开发已经有更轻量、性能更好、功能更丰富的动画库,以下是几个推荐的动画库:

- [GSAP](https://github.com/greensock/GSAP)
- [animejs](https://github.com/juliangarnier/anime)
- [motion](https://github.com/motiondivision/motion)
- [velocityjs](https://github.com/julianshapiro/velocity)(比较接近`$.animate()`语法)

## 不支持ajax模块

也有更好,更现代化的替代品,因此`domtify`没有必要耗费精力在这上面,既然包名叫做**domtify**当然是主要以操作DOM为主。

- [axios](https://github.com/axios/axios)(**推荐**)
- [ky](https://github.com/sindresorhus/ky)
- [wretch](https://github.com/elbywan/wretch)

## 不再支持css()方法的“猜测”行为

在设置样式时,`d.css()`方法不支持像`$.css()`那样支持很多边缘情况,我觉得这种边缘情况的支持很明显缺点更多

可以看到jQuery的`$.css()`针对它内部维护的一组白名单属性(和数值有关的属性)支持下面特别多的情况：

```js
// number
$("#box1").css("width", 200)
// 字符串
$("#box1").css("width", "200")
// 携带非px单位的字符串
$("#box1").css("width", "10rem")
// 自增(px)
$("#box1").css("width", "+=200")
// 自增(rem)
$("#box1").css("width", "+=10rem") // <div id="box1" style="width: 13.125rem;">1</div>
```

这些操作的内部逻辑是非常多的而且繁琐的,只为了支持这种不直观的行为，只会导致`css()`方法的体积增大,实际上意义根本不大

`d.css()`不支持这种情况的原因如下：

- **不依赖复杂解析逻辑**
- **用户体验清晰直观**
- **与原生 setProperty 语义一致**
- **保持代码精简**
- **全面利用[setProperty](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration/setProperty)的能力(支持 !important 和 CSS 变量)**

具体可以查看详细的[css方法](/reference/method-css)文档部分

## 事件系统

由于domtify是完全支持[addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)方法的所有参数的,可以完美的解决jQuery中一个遗存多年的[issues](https://github.com/jquery/jquery/issues/2871),因此可以完美的解决部分事件在控制台爆出的警告

比如监听`touchstart`、`touchmove`事件,Chrome会在控制台爆出如下警告

![touchstart警告](/touchstart-warn.png "touchstart警告")

使用options参数,因此您就可以轻松解决这个问题

```js
d("selector").on("touchstart", handler, { passive: true })
```

### 普通对象

jQuery 支持处理普通对象上的事件。

```js
$({}).on("foo", () => {})
```

domtify则不支持。实际上在我设计domtify之前，我甚至从不知道jQuery的事件系统还支持普通对象。这是我在查阅一些其它模仿jQuery的库,比如[zepto](https://github.com/madrobby/zepto)仓库的一个[issues#793](https://github.com/madrobby/zepto/issues/793)时看到一个用法。这个issues创建的日期竟然是2013年,我不知道也情有可原。

经过我后来的了解,原来传入普通对象的话就相当于一个事件总线的用法。事件总线已经有非常多的非常轻非常
小的优秀开源库，所以domtify完全没有必要支持和实现这一点。

## 不支持$.when助手函数

这是jQuery的[$.when](https://api.jquery.com/jQuery.when/#jQuery-when-deferreds)官方文档,实际上现代化浏览器您完全可以直接使用[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise)。
