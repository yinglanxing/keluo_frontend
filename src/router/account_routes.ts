import { RouteRecordSingleViewWithChildren } from 'vue-router';
import { useUser } from 'stores/useUser';

export const AccountRoute: RouteRecordSingleViewWithChildren = {
    path: 'account',
    beforeEnter(_, form) {
        // 检查用户已登录
        const user = useUser();
        if (user.userToken) {
            return true;
        }
        // 提示用户登录
        user.alert_plain(1);
        return form;
    },
    children: [
        { path: '', redirect: '/account/self' },
        // 用户信息页面
        {
            path: 'self', component: () => import('pages/user/SelfPage.vue'),
            children: [
                { path: '', component: () => import('pages/user/DashBoard.vue') },
                // 文章管理
                { path: 'article', component: () => import('pages/article/AuthorArticlePage.vue') },
                // 草稿管理
                { path: 'draft', component: () => import('pages/article/DraftList.vue') },
                // 用户信息页面
                { path: 'edit_info', component: () => import('pages/user/EditInfo.vue') },
            ],
        },
    ],
};