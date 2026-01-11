import { isUndefined } from 'is-what'

export const detach = selector => els => {
  const targets = isUndefined(selector)
    ? els
    : els.filter(el => el.matches(selector))

  for (const element of targets) {
    element.remove() // 直接从 DOM 删除
  }

  return els
}
