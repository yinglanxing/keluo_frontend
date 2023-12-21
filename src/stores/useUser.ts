import axios, { AxiosError } from 'axios';
import router from 'src/router/index';
// 用户状态
import { defineStore } from 'pinia';

import { SelfInfo, UserInfo, TokenJson } from 'stores/schemas/user';


export const useUser = defineStore('user_state', {
    state(): SelfInfo {
        return {
            // 登录界面状态
            loginPlain: 0,
            // 用户身份
            userToken: localStorage.getItem('a_token') || null,
            resetToken: localStorage.getItem('r_token') || null,
            // 当前用户信息
            info: {} as UserInfo,
        };
    },
    getters: {},
    actions: {
        // 检查登录
        is_login(): boolean {
            // 用户未登录
            if (!this.userToken) {
                this.alert_plain(1);
            }
            return Boolean(this.userToken);
        },
        // 完成登录
        user_login(token: TokenJson, status = 1) {
            // 获取 token 写入请求头部
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.a_token;
            axios.get('/api/v1/user/self').then((req) => {
                if (req.status == 200) {
                    // 成功后写入token
                    this.userToken = token.a_token;
                    this.resetToken = token.r_token;
                    if (status) {
                        localStorage.setItem('a_token', token.a_token);
                        localStorage.setItem('r_token', token.r_token);
                    }
                    // 写入用户信息
                    this.info = req.data;
                } else if (req instanceof AxiosError) {
                    axios.defaults.headers.common['Authorization'] = '';
                    if (req.request.status >= 400 && req.request.status < 500) {
                        // 无法取得信息时清空之前存储的
                        this.user_logout();
                    } else if (req.request.status == 301) {
                        this.alert_plain(0);
                        localStorage.setItem('token', token.a_token);
                        localStorage.setItem('token2', token.r_token);
                        // 使用 useRouter 会变成 undefined
                        // 跳转到手机号绑定
                        window.location.href='/#/account_help/bind_phone'
                        location.reload()
                    }
                }
            });
        },
        // 登出
        user_logout() {
            // 清空信息
            this.info = {} as UserInfo;
            this.userToken = this.resetToken = '';
            axios.defaults.headers.common['Authorization'] = '';
            // 清空登录信息
            localStorage.setItem('a_token', '');
            localStorage.setItem('r_token', '');
        },
        // 刷新数据
        flash_info() {
            axios.get('/api/v1/user/self').then((req) => {
                if (req.status == 200) {
                    // 写入用户信息
                    this.info = req.data;
                    this.alert_plain(0);
                }
            }).catch(() => {
                // 无法取得信息时清空之前存储的身份
                this.user_logout();
            });
        },
        // 切换登录弹窗状态
        alert_plain(num = -1) {
            this.loginPlain = num;
        },
    },
});
