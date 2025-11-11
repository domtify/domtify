// src/utils/parseHtml.ts
import { isString, isUndefined, isNull, isInstanceOf } from "is-what"

/**
 * 判断是否为 HTML 字符串
 */
const isHtmlString = (str: unknown): str is string =>
  isString(str) && str.trim().startsWith("<")

/**
 * 将 HTML 字符串解析为 DOM 节点数组
 * @param data - 要解析的 HTML 字符串
 * @param context - 可选上下文（Document 或 Element）
 * @param keepScripts - 是否保留 <script> 标签（默认 false）
 * @returns 节点数组 (Node[])
 */
const parseHTML = (
  data: unknown,
  context?: Document | Element | null,
  keepScripts: boolean = false,
): Node[] => {
  let nodes: Node[] = []

  // 仅字符串才处理
  if (!isString(data)) return nodes

  // 如果未指定 context，则创建一个新的 Document
  if (isNull(context) || isUndefined(context)) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(data, "text/html")
    nodes = Array.from(doc.body.childNodes)
  } else {
    // 若 context 是 Node，则确保取到 Document
    if (isInstanceOf(context, Node)) {
      context =
        context.nodeType === Node.DOCUMENT_NODE
          ? (context as Document)
          : (context.ownerDocument as Document)
    } else {
      context = document
    }

    // 创建临时范围并解析 HTML 片段
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

export { isHtmlString, parseHTML }
