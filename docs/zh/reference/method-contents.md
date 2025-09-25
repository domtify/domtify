# .contents()

## .contents()

- **返回:** [domtify](/reference/Types#domtify)

获取匹配元素集合中每个元素的子元素，包括文本和注释节点。

### .contents() <small style="font-size: 12px; color: var(--vp-c-green);">from @1.0</small>

- 该方法不接受任何参数

给定一个表示DOM元素集合的domtify对象，`.contents()`方法允许我们搜索DOM树中这些元素的直接子元素，并从匹配的元素构造一个新的domtify对象。`.contents()`和`.children()`方法相似，只是前者在生成的domtify对象中包括文本节点和注释节点以及HTML元素。

> [!IMPORTANT]
> 请注意，大多数jQuery操作不支持文本节点和注释节点。支持的操作在其API文档页面上会有明确的说明。

`.contents()`方法也可以用于获取iframe的内容文档，如果iframe与主页面在同一域中。
