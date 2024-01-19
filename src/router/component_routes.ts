import { RouteRecordSingleViewWithChildren } from 'vue-router';

export const ComponentRoute: RouteRecordSingleViewWithChildren = {
    path: 'component',
    children: [
        { path: '', component: () => import('pages/component/ComponentPage.vue') },
        { path: ':id', component: () => import('pages/component/ComponentById.vue') },
    ],
};