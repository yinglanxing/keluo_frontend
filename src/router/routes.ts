import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    // 基础路由
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            // 主页
            { path: '', component: () => import('pages/Index.vue') },
            { path: 'index', component: () => import('pages/Index.vue') },
            // {path: '', component: () => import('pages/Index.vue')},
            // {path: '', component: () => import('pages/Index.vue')},
            // 编辑路由
            {
                path: 'edit',
                children: [
                    { path: 'writer', component: () => import('pages/edit/Writer.vue') },
                ],
            },
            // 文章路由
            {
                path: 'article',
                children: [
                    { path: ':id', component: () => import('pages/article/[id].vue') },
                ],
            },
            // 用户路由
            {
                path: 'user',
                children: [
                    { path: ':id', component: () => import('pages/user/[id].vue') },
                ],
            },
            // 匹配空页面
            {
                path: ':catchAll(.*)*',
                component: () => import('pages/Error.vue'),
            },
        ],
    },
];

export default routes;
