// 全局状态
import { defineStore } from 'pinia';

import { GlobalState } from "stores/schemas/setting";

export const useState = defineStore('state', {
    state(): GlobalState {
        // 获取本地存储进行初始化
        const setup = JSON.parse(localStorage.getItem('state')||'{}')
        return {
            // 用户使用语言
            lang: setup.lang || 'zh-CN',
            // 页面颜色主题
            theme: setup.theme || (window.matchMedia('(prefers-color-scheme: dark)')?'dark':'light'),
        }
    },
    getters: {

    },
    actions: {

    },
});
