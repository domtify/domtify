import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from 'vitepress-plugin-group-icons'

import { search as zhSearch } from './zh.mjs'

export const shared = defineConfig({
  // 标题
  title: `domtify`,
  titleTemplate: `:title - 现代的DOM操作库`,
  description:
    'domtify一个一个极简、独立的 DOM 操作 JavaScript 库,让 DOM 操作变得高效而优雅',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    [
      'meta',
      {
        name: 'keywords',
        content: `domtify,jquery,browser,javascript,library`,
      },
    ],
    [
      'meta',
      {
        name: 'google',
        content: `notranslate`,
      },
    ],
  ],
  outDir: './.vitepress/dist',
  rewrites: {
    'zh/:rest*': ':rest*',
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
    },
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息',
    },
  },
  vite: {
    plugins: [groupIconVitePlugin()],
  },

  themeConfig: {
    logo: { src: '/logo-mini.svg', width: 24, height: 24 },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/domtify/domtify',
      },
    ],

    search: {
      provider: 'local',
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
