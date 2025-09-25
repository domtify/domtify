# .toggleClass()

## .toggleClass( className )

- **返回:** [domtify](/reference/Types#domtify)

根据类的存在性或 state 参数的值，向匹配元素集合中的每个元素添加或移除一个或多个类。

### .toggleClass( className ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **className**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 为匹配集合中的每个元素切换一个或多个类（以空格分隔）。

### .toggleClass( className, state ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **classNames**
  - **类型:** [String](/reference/Types#string)
  - **描述:** 为匹配集合中的每个元素切换一个或多个类（以空格分隔）。
- **state**
  - **类型:** [Boolean](/reference/Types#boolean)
  - **描述:** 一个布尔值（不仅仅是真值/假值）来确定是否应该添加或删除该类。

### .toggleClass( classNames ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **classNames**
  - **类型:** [Array](/reference/Types#array)
  - **描述:** 为匹配集中的每个元素切换的类数组。

### .toggleClass( classNames, state ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **classNames**
  - **类型:** [Array](/reference/Types#array)
  - **描述:** 为匹配集中的每个元素切换的类数组。
- **state**
  - **类型:** [Boolean](/reference/Types#boolean)
  - **描述:** 一个布尔值（不仅仅是真值/假值）来确定是否应该添加或删除该类。

### .toggleClass( function [, state ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [String](/reference/Types#string) currentClassName,[Boolean](/reference/Types#boolean) state ) => [String](/reference/Types#string)
  - **描述:** 一个返回一个或多个以空格分隔的类名的函数，这些类名将在匹配集合中每个元素的 class 属性中被切换。该函数接收集合中元素的索引位置、旧的类值和状态作为参数。
- **state**
  - **类型:** [Boolean](/reference/Types#boolean)
  - **描述:** 一个布尔值（不仅仅是真值/假值）来确定是否应该添加或删除该类。

### .toggleClass( function [, state ] ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **function**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [String](/reference/Types#string) currentClassName,[Boolean](/reference/Types#boolean) state ) => [String](/reference/Types#string) | [Array](/reference/Types#array)
  - **描述:** 一个返回一个或多个以空格分隔的类名或类名数组的函数，这些类名将在匹配集合中每个元素的 class 属性中被切换。该函数接收集合中元素的索引位置、旧的类值和状态作为参数。
- **state**
  - **类型:** [Boolean](/reference/Types#boolean)
  - **描述:** 一个布尔值（不仅仅是真值/假值）来确定是否应该添加或删除该类。

此方法接受一个或多个类作为其参数。如果匹配元素集合中的某个元素已经具有该类，则将其移除；如果元素没有该类，则将其添加。例如，我们可以将 .toggleClass() 应用于一个简单的 `<div>`：

```html
<div class="tumble">Some text.</div>
```

第一次应用 `d( "div.tumble" ).toggleClass( "bounce" )` 时，我们得到以下结果：

```html
<div class="tumble bounce">Some text.</div>
```

第二次应用 `d( "div.tumble" ).toggleClass( "bounce" )` 时，`<div>` 类返回到单个 `tumble` 值：

```html
<div class="tumble">Some text.</div>
```

对同一个 `<div>` 应用 `.toggleClass( "bounce spin" )` 会在 `<div class="tumble bounce spin">` 和 `<div class="tumble">` 之间交替。

`.toggleClass()` 也可以使用第二个参数来确定是否应该添加或移除类。如果此参数的值为 true，则添加类；如果为 false，则移除类。本质上，语句：

```js
d("#foo").toggleClass(className, addOrRemove)
```

等价于：

```js
if (addOrRemove) {
  d("#foo").addClass(className)
} else {
  d("#foo").removeClass(className)
}
```
