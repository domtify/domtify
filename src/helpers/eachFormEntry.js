export const eachFormEntry = (els, cb) => {
  for (const el of els) {
    if (el.tagName !== 'FORM') continue
    const fd = new FormData(el)
    for (const entry of fd.entries()) {
      cb(entry)
    }
  }
}
