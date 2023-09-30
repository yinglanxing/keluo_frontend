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
        // 页面过度
        // pageTransition: {name: 'page', mode: 'out-in'},

        // html 头部
        head: {
            // 编码格式与布局
            charset: "utf-8",
            viewport: "width=500, initial-scale=1",
            // 标题模版 页面标题 + 主标题
            title: "-科洛-",
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
        // "nuxt-quasar-ui",
        "@unocss/nuxt",

        // 状态管理
        "@pinia/nuxt",

        // 国际化
        '@nuxtjs/i18n',
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

    // 国际化
    i18n: {
        // 默认配置 可略
        vueI18n: './i18n.config.ts'
    }
    // https://github.com/nuxt-modules/i18n/issues/2394#issuecomment-1712751292
    // [intlify] the message that is resolve with key 'xxx' is not supported for jit compilation
    // 需要 shell 执行
    // pnpm i -D @nuxtjs/i18n@npm:@nuxtjs/i18n-edge


    // build: {
    //     transpile: process.env.NODE_ENV === 'production' ? ['@css-render/vue3-ssr',] : []
    // },
})
