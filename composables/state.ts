// 全局状态

import {defineStore} from "pinia";

export const STATE = defineStore('state', {
    state(): GlobalState {
        return {
            lang: "zh",
            theme: "light",
        }
    },
    getters: {},
    actions: {
        change() {
        }
    }
})

interface GlobalState {
    lang: string
    theme: "light" | "dark"
}
