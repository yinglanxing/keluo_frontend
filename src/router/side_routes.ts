import { RouteRecordSingleViewWithChildren } from 'vue-router';
import { useUser } from 'stores/useUser';

export const sideRoute: RouteRecordSingleViewWithChildren = {
    path: 'index', component: () => import('pages/index/IndexPage.vue'),
    children: [
        {path: '', component: () => import('pages/index/IndexBase.vue')},
        { path: 'explore', component: () => import('pages/index/IndexExplore.vue') },
        {
            path: 'drafts',
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
            component: () => import('pages/article/DraftList.vue')
        },
        {
            path: 'bookmarks',
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
            component: () => import('pages/article/ArticleCollect.vue')
        },
    ],
};
