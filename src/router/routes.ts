import { RouteRecordRaw } from 'vue-router';
import { useUser } from 'stores/useUser';
import { sideRoute } from 'src/router/side_routes';

const routes: RouteRecordRaw[] = [
    // 基础路由
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            // 主页
            { path: '', component: () => import('pages/IndexPage.vue') },

            // 侧边栏路由
            sideRoute,

            // 忘记密码
            { path: 'forget_pass', component: () => import('pages/user/account/ForgetPass.vue') },
            // 用户路由
            {
                path: 'user',
                children: [
                    { path: '', redirect: '/' },
                    { path: ':id', component: () => import('pages/user/UserById.vue') },
                ],
            },
            // 账号相关
            {
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
                    { path: 'self', component: () => import('pages/user/SelfPage.vue') },
                    // 用户信息页面
                    { path: 'edit_info', component: () => import('pages/user/EditInfo.vue') },
                    // 绑定手机号
                    { path: 'bind_phone', component: () => import('pages/user/account/BindPhone.vue') },
                ],
            },
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
                    { path: 'article', component: () => import('pages/edit/ArticleOrDraft.vue') },
                    { path: 'tag', component: () => import('pages/edit/EditTag.vue') },
                    { path: 'draft', component: () => import('components/article/DraftsList.vue') },
                ],
            },
            // 文章路由
            {
                path: 'article',
                children: [
                    { path: '', component: () => import('pages/IndexPage.vue') },
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
            // 匹配空页面
            {
                path: ':catchAll(.*)*',
                component: () => import('pages/ErrorPage.vue'),
            },
        ],
    },
];

export default routes;
