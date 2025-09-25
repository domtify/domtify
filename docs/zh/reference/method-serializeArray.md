# .serializeArray()

## .serializeArray()

- **返回:** [domtify](/reference/Types#domtify)

将表单的数据 序列化为对象数组，每个数组元素都是 `{ name: "...", value: "..." }`。

### .serializeArray( ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **该方法不需要参数**

返回的是数组，适合在前端进一步处理或转换为JSON。可以方便地对数据进行操作，例如过滤、修改或组合。

例子：

想象有以下表单：

```html
<form>
  <select name="single">
    <option>Single</option>
    <option>Single2</option>
  </select>

  <br />
  <select name="multiple" multiple="multiple">
    <option selected="selected">Multiple</option>
    <option>Multiple2</option>
    <option selected="selected">Multiple3</option>
  </select>

  <br />
  <input type="checkbox" name="check" value="check1" id="ch1" />
  <label for="ch1">check1</label>
  <input
    type="checkbox"
    name="check"
    value="check2"
    checked="checked"
    id="ch2"
  />
  <label for="ch2">check2</label>

  <br />
  <input type="radio" name="radio" value="radio1" checked="checked" id="r1" />
  <label for="r1">radio1</label>
  <input type="radio" name="radio" value="radio2" id="r2" />
  <label for="r2">radio2</label>
</form>
```

使用该方法获取表单元素携带的数据：

```js
const result = d("form").serializeArray()
```

返回的结果如下：

```js
;[
  {
    name: "single",
    value: "Single",
  },
  {
    name: "multiple",
    value: "Multiple",
  },
  {
    name: "multiple",
    value: "Multiple3",
  },
  {
    name: "check",
    value: "check2",
  },
  {
    name: "radio",
    value: "radio1",
  },
]
```
