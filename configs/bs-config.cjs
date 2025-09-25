/**
 * BrowserSync 配置文件
 * 文档: https://browsersync.io/docs/options
 */
module.exports = {
  server: {
    baseDir: ["dist", "examples"], // 先查 dist，再查 examples
    routes: {
      "/": "node_modules/jquery/dist", // 映射 jquery
    },
  },

  files: ["examples/*.html", "dist/**/*.js"],
  port: 3001,
  ui: {
    port: 3003,
  },
  notify: false,
  open: "3001",
}
