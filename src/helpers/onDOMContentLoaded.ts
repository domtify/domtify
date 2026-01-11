const domContentLoadedCallbacks = []
export const onDOMContentLoaded = callback => {
  if (document.readyState === 'loading') {
    // 当文档处于加载状态时，在首次调用时添加监听器
    if (!domContentLoadedCallbacks.length) {
      document.addEventListener('DOMContentLoaded', () => {
        for (const callback of domContentLoadedCallbacks) {
          callback()
        }
      })
    }

    domContentLoadedCallbacks.push(callback)
  } else {
    callback()
  }
}
