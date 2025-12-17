export const contents = () => (els) => {
  const result = []

  for (const el of els) {
    if (el.tagName === "IFRAME") {
      try {
        const doc = el.contentDocument
        if (doc) result.push(doc)
      } catch (e) {
        // 忽略 iframe 跨域等错误
      }
    } else {
      result.push(...el.childNodes)
    }
  }

  return result
}
