# .map()

## .map( callback )

- **返回:** [domtify](/reference/Types#domtify)

将当前匹配集合中的每个元素传递给一个函数，通过该函数生成一个包含返回值的新 domtify 对象。

### .map( callback ) <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- **callback**
  - **类型:** [Function](/reference/Types#function)( [Integer](/reference/Types#integer) index, [String](/reference/Types#string) domElement ) => [Object](/reference/Types#object)
  - **描述:** 一个函数对象，将为当前集合中的每个元素调用。

如果你希望处理一个普通的数组或对象，请使用 [d.map()](/reference/utilities-map)。

由于返回值是一个 domtify 对象，其中包含一个数组，因此通常会在结果上调用 `.get()` 来处理一个基本数组。

`.map()` 方法对于获取或设置一组元素的值特别有用。考虑一个包含一组复选框的表单：

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

要获取一个以逗号分隔的复选框 ID 列表：

```js
$(":checkbox")
  .map(function () {
    return this.id
  })
  .get()
  .join()
```

此调用的结果是字符串 "two,four,six,eight"。

在回调函数内部，`this` 指的是每次迭代中的当前 `DOM` 元素。该函数可以返回一个单独的数据项或一个要插入到结果集中的数据项数组。如果返回的是数组，则数组中的元素会被插入到集合中。如果函数返回 `null` 或 `undefined`，则不会插入任何元素。
