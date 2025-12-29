import { defineConfig } from "vitepress"

export const zh = defineConfig({
  lang: "zh-Hans",
  description: "vitepress构建文档模板",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/guide/": { base: "/guide/", items: sidebarGuide() },
      "/reference/": {
        base: "/reference/",
        items: sidebarAPI(),
      },
    },

    editLink: {
      pattern: "https://github.com/domtify/domtify/tree/main/docs/:path",
      text: "在 GitHub 上编辑此页面",
    },

    footer: {
      message: "基于 MIT 许可发布",
      copyright: `Copyright © 2025-至今 ajiho`,
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
      level: "deep",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",

    notFound: {
      title: "找不到页面",
      quote: "如果你不改变方向，并且一直走下去，你最终会到达现在前进的地方",
      linkLabel: "回到首页",
      linkText: "带我回家",
    },
  },
})

function nav() {
  return [
    {
      text: "指南",
      link: "/guide/getting-started",
      activeMatch: "/guide/",
    },
    {
      text: "参考",
      link: "/reference/method-get",
      activeMatch: "/reference/",
    },
  ]
}

function sidebarGuide() {
  return [
    {
      text: "指南",
      items: [
        { text: "介绍", link: "introduce" },
        { text: "快速开始", link: "getting-started" },
        { text: "迁移指南", link: "migration" },
      ],
    },
  ]
}

function sidebarAPI() {
  return [
    {
      text: "参考",
      items: [
        {
          text: "类型参考",
          link: "Types",
        },
        {
          text: "方法",
          collapsed: false,
          items: [
            {
              text: "get",
              link: "method-get",
            },
            {
              text: "on",
              link: "method-on",
            },
            {
              text: "off",
              link: "method-off",
            },
            {
              text: "one",
              link: "method-one",
            },
            {
              text: "trigger",
              link: "method-trigger",
            },
            {
              text: "eq",
              link: "method-eq",
            },
            {
              text: "first",
              link: "method-first",
            },
            {
              text: "last",
              link: "method-last",
            },
            {
              text: "hasClass",
              link: "method-hasClass",
            },
            {
              text: "addClass",
              link: "method-addClass",
            },
            {
              text: "removeClass",
              link: "method-removeClass",
            },
            {
              text: "toggleClass",
              link: "method-toggleClass",
            },
            {
              text: "replaceClass",
              link: "method-replaceClass",
            },
            {
              text: "each",
              link: "method-each",
            },
            {
              text: "filter",
              link: "method-filter",
            },
            {
              text: "is",
              link: "method-is",
            },
            {
              text: "map",
              link: "method-map",
            },
            {
              text: "parent",
              link: "method-parent",
            },
            {
              text: "parents",
              link: "method-parents",
            },
            {
              text: "closest",
              link: "method-closest",
            },
            {
              text: "siblings",
              link: "method-siblings",
            },
            {
              text: "parentsUntil",
              link: "method-parentsUntil",
            },
            {
              text: "contents",
              link: "method-contents",
            },
            {
              text: "find",
              link: "method-find",
            },
            {
              text: "css",
              link: "method-css",
            },
            {
              text: "text",
              link: "method-text",
            },
            {
              text: "val",
              link: "method-val",
            },
            {
              text: "html",
              link: "method-html",
            },
            {
              text: "add",
              link: "method-add",
            },
            {
              text: "index",
              link: "method-index",
            },
            {
              text: "empty",
              link: "method-empty",
            },
            {
              text: "has",
              link: "method-has",
            },
            {
              text: "height",
              link: "method-height",
            },
            {
              text: "innerHeight",
              link: "method-innerHeight",
            },
            {
              text: "outerHeight",
              link: "method-outerHeight",
            },
            {
              text: "width",
              link: "method-width",
            },
            {
              text: "innerWidth",
              link: "method-innerWidth",
            },
            {
              text: "outerWidth",
              link: "method-outerWidth",
            },
            {
              text: "next",
              link: "method-next",
            },
            {
              text: "nextAll",
              link: "method-nextAll",
            },
            {
              text: "nextUntil",
              link: "method-nextUntil",
            },
            {
              text: "not",
              link: "method-not",
            },

            {
              text: "slice",
              link: "method-slice",
            },
            {
              text: "resize",
              link: "method-resize",
            },
            {
              text: "offset",
              link: "method-offset",
            },
            {
              text: "prop",
              link: "method-prop",
            },
            {
              text: "remove",
              link: "method-remove",
            },
            {
              text: "detach",
              link: "method-detach",
            },
            {
              text: "data",
              link: "method-data",
            },
            {
              text: "removeData",
              link: "method-removeData",
            },
            {
              text: "append",
              link: "method-append",
            },
            {
              text: "appendTo",
              link: "method-appendTo",
            },
            {
              text: "before",
              link: "method-before",
            },
            {
              text: "insertBefore",
              link: "method-insertBefore",
            },
            {
              text: "after",
              link: "method-after",
            },
            {
              text: "insertAfter",
              link: "method-insertAfter",
            },
            {
              text: "children",
              link: "method-children",
            },

            {
              text: "clone",
              link: "method-clone",
            },
            {
              text: "offsetParent",
              link: "method-offsetParent",
            },
            {
              text: "position",
              link: "method-position",
            },
            {
              text: "prepend",
              link: "method-prepend",
            },
            {
              text: "prependTo",
              link: "method-prependTo",
            },
            {
              text: "prev",
              link: "method-prev",
            },
            {
              text: "prevAll",
              link: "method-prevAll",
            },
            {
              text: "prevUntil",
              link: "method-prevUntil",
            },
            {
              text: "serialize",
              link: "method-serialize",
            },
            {
              text: "serializeArray",
              link: "method-serializeArray",
            },
            {
              text: "odd",
              link: "method-odd",
            },
            {
              text: "even",
              link: "method-even",
            },
            {
              text: "removeAttr",
              link: "method-removeAttr",
            },
            {
              text: "removeProp",
              link: "method-removeProp",
            },
            {
              text: "uniqueSort",
              link: "method-uniqueSort",
            },
            {
              text: "replaceWith",
              link: "method-replaceWith",
            },
            {
              text: "replaceAll",
              link: "method-replaceAll",
            },
            {
              text: "scrollLeft",
              link: "method-scrollLeft",
            },
            {
              text: "scrollTop",
              link: "method-scrollTop",
            },
            {
              text: "wrap",
              link: "method-wrap",
            },
            {
              text: "unwrap",
              link: "method-unwrap",
            },
            {
              text: "wrapAll",
              link: "method-wrapAll",
            },
            {
              text: "wrapInner",
              link: "method-wrapInner",
            },
          ],
        },
        {
          text: "助手",
          collapsed: false,
          items: [
            {
              text: "extend",
              link: "utilities-extend",
            },
            {
              text: "param",
              link: "utilities-param",
            },
            {
              text: "debounce",
              link: "utilities-debounce",
            },
            {
              text: "throttle",
              link: "utilities-throttle",
            },
            {
              text: "parseHTML",
              link: "utilities-parseHTML",
            },
            {
              text: "each",
              link: "utilities-each",
            },
            {
              text: "map",
              link: "utilities-map",
            },
            {
              text: "getIn",
              link: "utilities-getIn",
            },
            {
              text: "setIn",
              link: "utilities-setIn",
            },
          ],
        },
      ],
    },
  ]
}

export const markdown = {
  container: {
    tipLabel: "提示",
    warningLabel: "警告",
    dangerLabel: "危险",
    infoLabel: "信息",
    detailsLabel: "详细信息",
  },
}

export const search = {
  zh: {
    placeholder: "搜索文档",
    translations: {
      button: {
        buttonText: "搜索文档",
        buttonAriaLabel: "搜索文档",
      },
      modal: {
        searchBox: {
          resetButtonTitle: "清除查询条件",
          resetButtonAriaLabel: "清除查询条件",
          cancelButtonText: "取消",
          cancelButtonAriaLabel: "取消",
        },
        startScreen: {
          recentSearchesTitle: "搜索历史",
          noRecentSearchesText: "没有搜索历史",
          saveRecentSearchButtonTitle: "保存至搜索历史",
          removeRecentSearchButtonTitle: "从搜索历史中移除",
          favoriteSearchesTitle: "收藏",
          removeFavoriteSearchButtonTitle: "从收藏中移除",
        },
        errorScreen: {
          titleText: "无法获取结果",
          helpText: "你可能需要检查你的网络连接",
        },
        footer: {
          selectText: "选择",
          navigateText: "切换",
          closeText: "关闭",
          searchByText: "搜索提供者",
        },

        noResultsText: "无法找到相关结果",
        resetButtonTitle: "重置搜索",
        displayDetails: "显示详情视图",
        noResultsScreen: {
          noResultsText: "无法找到相关结果",
          suggestedQueryText: "你可以尝试查询",
          reportMissingResultsText: "你认为该查询应该有结果？",
          reportMissingResultsLinkText: "点击反馈",
        },
      },
    },
  },
}
