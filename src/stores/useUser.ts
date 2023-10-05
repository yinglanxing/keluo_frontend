// 用户状态
import {defineStore} from 'pinia';

// 模型
import {SelfInfo, UserInfo} from 'stores/schemas/user';


export const useUser = defineStore('user_state', {
    state(): SelfInfo {
        return {
            // 登录界面状态
            loginPlain: 0,
            // 用户身份
            userToken: null,
            // 当前用户
            info: {} as UserInfo,
        }
    },
    getters: {
        isLogin(state: SelfInfo): boolean {
            // 判断已登录
            return Boolean(state.info.id)
        }
    },
    actions: {
        // 切换登录弹窗状态
        alert_plain(num = -1) {
            this.loginPlain = num
        }
    }
})
