<template>
    <q-card class="q-pa-lg">
        <q-btn color="primary" class="full-width" to="/edit/article">写文章</q-btn>

        <div class="q-ma-md"></div>

        <q-list bordered class="rounded-borders">
            <q-expansion-item
                expand-separator
                default-opened
                icon="bi-stack"
                label="内容管理"
            >
                <q-item clickable disable to="/">
                    文章管理
                </q-item>
                <q-item clickable disable to="/">
                    专栏管理
                </q-item>
                <q-item clickable disable to="/">
                    沸点管理
                </q-item>
            </q-expansion-item>

            <q-expansion-item
                expand-separator
                default-opened
                icon="bi-graph-up"
                label="数据中心"
            >
                <q-item clickable disable to="/">
                    内容数据
                </q-item>
                <q-item clickable disable to="/">
                    粉丝数据
                </q-item>
            </q-expansion-item>

            <q-expansion-item
                expand-separator
                default-opened
                icon="bi-bar-chart-steps"
                label="创作成长"
            >
                <q-item clickable disable to="/">
                    创作等级权益
                </q-item>
                <q-item clickable disable to="/">
                    创作灵感
                </q-item>
            </q-expansion-item>

            <q-expansion-item
                expand-separator
                default-opened
                icon="bi-stars"
                label="创作工具"
            >
                <q-item clickable disable to="/">
                    文章导入发布
                </q-item>
            </q-expansion-item>

            <q-expansion-item
                expand-separator
                default-opened
                icon="bi-question-circle-fill"
                label="帮助中心"
            >
                <q-item clickable disable to="/">
                    常见问题
                </q-item>
            </q-expansion-item>
        </q-list>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from "axios";

import { useUser } from 'stores/useUser';
import {UserInfo} from "stores/schemas/user";

export default defineComponent({

    components: {},

    setup() {

        // 用户状态
        const user = useUser();
        return {
            user,
        };
    },

    methods: {

        logout(){
            this.user.info = {} as UserInfo
            this.user.userToken = this.user.resetToken = '';
            axios.defaults.headers.common['Authorization'] = '';
        },
    },

});
</script>
