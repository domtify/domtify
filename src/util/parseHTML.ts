import { isNull, isString, isUndefined } from 'is-what'

export const parseHTML = (
  data: string,
  context?: Node | Document | null,
  keepScripts: boolean = false,
): Node[] => {
  let nodes: Node[] = []

  if (!isString(data)) return nodes

  if (isNull(context) || isUndefined(context)) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(data, 'text/html')
    nodes = Array.from(doc.body.childNodes)
  } else {
    // 确保 context 是 Document
    let doc: Document
    if (context instanceof Document) {
      doc = context
    } else if (context instanceof Node && context.ownerDocument) {
      doc = context.ownerDocument
    } else {
      doc = document // fallback 到全局 document
    }

    // 创建临时容器
    const range = doc.createRange()
    const frag = range.createContextualFragment(data)
    nodes = Array.from(frag.childNodes)
  }

  if (!keepScripts) {
    nodes = nodes.filter(node => node.nodeName.toLowerCase() !== 'script')
  }

  return nodes
}
