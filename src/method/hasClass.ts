export const hasClass = className => els => {
  return els.some(el => el?.classList?.contains(className))
}
