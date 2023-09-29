// 用户状态
import {defineStore} from "pinia";

export const USER_STATE = defineStore('user_state', {
    state(): SelfInfo {
        return {
            // 登录界面状态
            loginPlain: 0,
            // 用户身份
            userToken: null,
            // 当前用户
            currentUser: {},
        }
    },
    getters: {
        isLogin(state): boolean {
            // 判断已登录
            return Boolean(this.currentUser.id)
        }
    },
    actions: {
        // 切换登录弹窗状态
        alert_plain(num: number = -1) {
            this.loginPlain = num | 0
        }
    }
})

// 登录用户自身信息
interface SelfInfo {
    loginPlain: number
    userToken: string | null
    currentUser: UserInfo | Object
}
