import { RouteRecordRaw } from 'vue-router';
import { useUser } from 'stores/useUser';
import { CommunityRoute } from 'src/router/community_routes';
import { AccountRoute } from './account_routes';
import { AccountHelpRoute } from './account_help_routes';
import { ComponentRoute } from './component_routes';

const routes: RouteRecordRaw[] = [
    // 基础路由
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            // 主页
            { path: '', redirect: '/index' },
            { path: 'index', component: () => import('pages/index/IndexPage.vue') },

            // 社区侧边栏路由
            CommunityRoute,

            // 账号内容路由
            AccountRoute,

            // 账户自助内容
            AccountHelpRoute,

            // 组件路由
            ComponentRoute,

            // 编辑路由
            {
                path: 'edit',
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
                    { path: '', redirect: '/' },
                    { path: 'article/:id?', component: () => import('pages/edit/ArticleOrDraft.vue') },
                    { path: 'draft/:id?', component: () => import('pages/edit/ArticleOrDraft.vue') },
                    { path: 'tag', component: () => import('pages/edit/EditTag.vue') },
                ],
            },

            // 文章路由
            {
                path: 'article',
                children: [
                    { path: '', redirect: '/' },
                    { path: ':id', component: () => import('pages/article/ArticleById.vue') },
                ],
            },

            // 标签路由
            {
                path: 'tag',
                children: [
                    { path: '', redirect: '/' },
                    { path: ':id', component: () => import('pages/tag/TagById.vue') },
                ],
            },

            // 用户路由
            {
                path: 'user',
                children: [
                    { path: '', redirect: '/' },
                    { path: ':id', component: () => import('pages/user/UserById.vue') },
                ],
            },

            // 匹配空页面
            {
                path: ':catchAll(.*)*',
                component: () => import('pages/ErrorPage.vue'),
            },
        ],
    },
];

export default routes;
