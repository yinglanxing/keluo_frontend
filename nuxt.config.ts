// https://nuxt.com/docs/api/configuration/nuxt-config

// 组件自动按需引用
import Components from "unplugin-vue-components/vite";
import {NaiveUiResolver} from "unplugin-vue-components/resolvers";

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
        "@pinia/nuxt",
    ],

    vite: {
        plugins: [
            // ui组件
            Components({
                resolvers: [
                    // naive-ui 自动加载
                    NaiveUiResolver(),
                    // arco 在模块中已存在
                    // ArcoResolver(),
                ]
            })
        ],

        // 暂未学习用途
        // optimizeDeps: {
        //     include:
        //         process.env.NODE_ENV === "development" ? ["naive-ui"] : []
        // }
    },

    // 注册自动引入组件
    components: [
        {
            path: '~/components',
            extensions: ['.vue'],
        }
    ]

})
