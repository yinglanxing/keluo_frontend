<template>
    <q-card flat bordered class="q-pa-lg">
        <q-btn color="primary" class="full-width" to="/edit/article">写文章</q-btn>

        <div class="q-ma-md"></div>

        <q-list class="rounded-borders">
            <q-expansion-item default-opened v-for="g in menubar" :key="g.l" :icon="g.i" :label="g.l">
                <q-item clickable v-for="li in g.child" :key="li.to" :to="li.to" :disable="li.disable"
                    :active="$route.path == li.to">
                    {{ li.label }}
                </q-item>
            </q-expansion-item>
        </q-list>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({

    data() {
        let menubar = [
            {
                l: '内容管理', i: 'bi-stack',
                child: [
                    { label: '文章管理', to: '/account/self/article', disable: false, },
                    { label: '草稿管理', to: '/account/self/draft', disable: false, },
                    // { label: '沸点管理', to: '', disable: true, },
                ],
            },
            {
                l: '数据中心', i: 'bi-graph-up',
                child: [
                    { label: '内容数据', to: '/account/self', disable: false, },
                    { label: '用户信息', to: '/account/self/edit_info', disable: false, },
                ],
            },
            {
                l: '创作成长', i: 'bi-bar-chart-steps',
                child: [
                    // { label: '创作等级权益', to: '', disable: true, },
                    // { label: '创作灵感', to: '', disable: true, },
                ],
            },
            {
                l: '创作工具', i: 'bi-stars',
                child: [
                    // { label: '文章导入发布', to: '', disable: true, },
                ],
            },
            {
                l: '帮助中心', i: 'bi-question-circle-fill',
                child: [
                    // { label: '常见问题', to: '', disable: true, },
                ],
            },
        ];
        return {
            menubar,
        };
    },

    methods: {
    },

});
</script>
