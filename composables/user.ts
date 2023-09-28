// 用户状态

import {defineStore} from "pinia";

export const USER_STATE = defineStore('user_state', {
    state(): SelfInfo {
        return {
            // 登录界面
            login_plain: 0,
            // 当前用户
            current_user: {} as UserInfo,
            // 用户身份
            user_token: null,
        }
    },
    getters: {},
    actions: {
        // 切换登录弹窗状态
        alert_plain(num: number = -1) {
            this.login_plain = num | 0
        }
    }
})

// 登录用户自身信息
interface SelfInfo {
    login_plain: number
    current_user: UserInfo | Object
    user_token: string | null
}

// 用户页面信息
// 文章信息
interface ArticleInfo {
    // id
    id: number
    // 标题
    title: string
    // 标签
    tags: []
    // 划分到的主区域
    basic: string
    // 时间
    time: number
    // 作者 id
    author: number

}
