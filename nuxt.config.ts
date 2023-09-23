// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({

    devtools: {enabled: true},

    // TODO <Suspense> is an experimental feature and its API will likely change.
    // 暂时未找到关闭此实验性功能的方法，项目中并未使用 <Suspense> 标签(来自Vue3)。
    // 由于 nuxt3 内部使用了相应技术配合 DataFetch 在创建项目时，就算无改动的初始项目，也会告知使用了此实验性功能。

    runtimeConfig: {
        // public:{},
    },

    app: {
        // html 头部
        head: {
            // 编码格式与布局
            charset: "f-16",
            viewport: "width=500, initial-scale=1",
            // 标题模版 页面标题 + 主标题
            titleTemplate(title: string | undefined): string {
                return title ? title + " -科洛-" : "-科洛-"
            },
            // 元数据
            meta: [
                // 介绍
                {name: "description", content: "科洛"}
            ],
        }
    },

    // layer 扩展
    extends: [],

    // 模块扩展
    modules: [
        // ui 组件
        "arco-design-nuxt-module",
        // 状态管理
        // "@pinia/nuxt",

        // ssr渲染
        // "@css-render/vue3-ssr",
    ],

    // 注册自动引入组件
    components: [
        {
            path: '~/components',
            extensions: ['.vue'],
        }
    ],

    // 自动引入
    imports: {
        dirs: [
            // 扫描整个目录
            'composables/**'
        ]
    },

    build: {
        // transpile: process.env.NODE_ENV === 'production' ? ['@css-render/vue3-ssr',] : []
    },

    // i18n 搁置
    // '@nuxtjs/i18n' 国际化组件导入导致项目无法运行
})
