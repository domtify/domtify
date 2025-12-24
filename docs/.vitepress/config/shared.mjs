import { defineConfig } from "vitepress"
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs"
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from "vitepress-plugin-group-icons"
import markDownItLivecodes from "markdown-it-livecodes"

import { search as zhSearch } from "./zh.mjs"

export const shared = defineConfig({
  // 标题
  title: "domtify",

  outDir: "./.vitepress/dist",

  rewrites: {
    "zh/:rest*": ":rest*",
  },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  markdown: {
    image: {
      lazyLoading: true,
    },
    lineNumbers: true,
    config(md) {
      md.use(tabsMarkdownPlugin)
      md.use(groupIconMdPlugin)
      md.use(markDownItLivecodes, {})
    },
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  vite: {
    plugins: [groupIconVitePlugin()],
  },

  head: [
    ["link", { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
  ],

  themeConfig: {
    logo: { src: "/logo-mini.svg", width: 24, height: 24 },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/domtify/domtify",
      },
    ],

    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            ...zhSearch.zh,
          },
        },
      },
    },
  },
})
