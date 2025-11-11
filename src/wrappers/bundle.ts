// 扩展 Window 接口的全局声明
declare global {
  interface Window {
    [key: string]: unknown
  }
}

/**
 * iife/umd格式的包装器,方便浏览器用户直接使用全部的方法
 */
import domtify from "@/index.js"
window.domtify = window.d = domtify

// 导入原型链方法和助手保持目录结构
import "@/methods.js"
import "@/utilities.js"
