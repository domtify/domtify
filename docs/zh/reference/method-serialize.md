# .serialize()

## .serialize()

- **返回:** [domtify](/reference/Types#domtify)

将表单的数据序列化为URL查询字符串(key1=value1&key2=value2),常用于AJAX提交。

### .serialize( ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **该方法不需要参数**

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
const result = d("form").serialize()
```

返回的结果如下：

```txt
single=Single&multiple=Multiple&multiple=Multiple3&check=check2&radio=radio1
```
