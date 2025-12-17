import { isString, isNull, isUndefined } from "is-what"

export const parseHTML = (data, context, keepScripts = false) => {
  let nodes = []

  if (!isString(data)) return nodes

  //  如果 context 未指定，则创建一个新的 Document
  if (isNull(context) || isUndefined(context)) {
    // 使用 DOMParser 将字符串解析成一个完整的文档
    const parser = new DOMParser()
    const doc = parser.parseFromString(data, "text/html")

    // 从文档中获取所有的子节点
    nodes = Array.from(doc.body.childNodes)
  } else {
    if (context instanceof Node) {
      context =
        context.nodeType === Node.DOCUMENT_NODE
          ? context
          : context.ownerDocument
    } else {
      context = document
    }

    // 创建临时容器
    const range = context.createRange()
    const frag = range.createContextualFragment(data)
    nodes = Array.from(frag.childNodes)
  }

  // 是否保留 <script> 标签
  if (!keepScripts) {
    nodes = nodes.filter((node) => {
      return !(node.nodeName && node.nodeName.toLowerCase() === "script")
    })
  }

  return nodes
}
