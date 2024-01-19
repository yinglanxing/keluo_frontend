import { RouteRecordSingleViewWithChildren } from 'vue-router';

export const AccountHelpRoute: RouteRecordSingleViewWithChildren ={
    path: 'account_help',
    children: [
        { path: '', redirect: '/' },
        // 绑定手机号
        { path: 'bind_phone', component: () => import('pages/user/account/BindPhone.vue') },
        // 绑定邮箱
        { path: 'bind_mail', component: () => import('pages/user/account/BindPhone.vue') },
        // 忘记密码
        { path: 'forget_pass', component: () => import('pages/user/account/ForgetPass.vue') },
    ],
};