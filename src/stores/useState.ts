// 全局状态
import { defineStore } from 'pinia';

export const useState = defineStore('state', {
    state(): GlobalState {
        return {
            lang: 'zh',
            theme: 'light',
        }
    },
    getters: {
        dark(): boolean {
            return this.theme == 'dark'
        }
    },
    actions: {
        changeTheme() {
            if (this.theme == 'dark') {
                this.theme = 'light'
            } else {
                this.theme = 'dark'
            }
        }
    }
})

interface GlobalState {
    lang: string
    theme: 'light' | 'dark'
}
