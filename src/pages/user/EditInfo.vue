<template>
    <!--用户面板-->
    <q-card>
        <q-item>
            <q-item-section avatar>
                <!--头像-->
                <div class="q-py-sm">
                    <q-avatar v-if="self.info.avatar">
                        <q-img :src="self.info.avatar"></q-img>
                    </q-avatar>
                    <q-avatar v-else icon="person"></q-avatar>
                </div>
            </q-item-section>
            <q-item-section>
                {{ self.info.username }}
                <div class="text-h6">编辑个人资料</div>
            </q-item-section>
        </q-item>
    </q-card>

    <div class="q-ma-md"></div>

    <q-card>
        <!--头像 用户名-->
        <q-item v-if="$q.screen.gt.sm">
            <q-item-section class="q-gutter-y-lg">
                <q-uploader class="w-auto" label="头像" disable></q-uploader>
                <!--介绍-->
                <q-editor
                    :toolbar="[]"
                    placeholder="介绍"
                    v-model="form.introduction"
                ></q-editor>
                <q-space></q-space>
                <q-btn class="full-width" color="green">提交</q-btn>
            </q-item-section>
            <q-item-section class="q-gutter-y-lg">
                <!--用户名-->
                <q-input filled label="名称" v-model="form.username"></q-input>
                <!--公司-->
                <q-input filled label="公司" v-model="form.company"></q-input>
                <!--git-->
                <q-input filled label="github" v-model="form.github"></q-input>
                <!--主页-->
                <q-input filled label="主页" v-model="form.homePage"></q-input>
                <!--位置-->
                <q-select filled label="location" v-model="form.location">
                    <template #prepend>
                        <q-icon name="language"></q-icon>
                    </template>
                </q-select>
                <!--地址-->
                <q-select filled label="position" v-model="form.position">
                    <template #prepend>
                        <q-icon name="place"></q-icon>
                    </template>
                </q-select>
            </q-item-section>
        </q-item>

        <q-item v-else>
            <q-item-section class="q-gutter-y-lg">
                <q-uploader class="w-auto" label="头像" disable></q-uploader>
                <!--介绍-->
                <q-editor
                    :toolbar="[]"
                    placeholder="介绍"
                    v-model="form.introduction"
                ></q-editor>
                <!--用户名-->
                <q-input filled label="名称" v-model="form.username"></q-input>
                <!--公司-->
                <q-input filled label="公司" v-model="form.company"></q-input>
                <!--git-->
                <q-input filled label="github" v-model="form.github"></q-input>
                <!--主页-->
                <q-input filled label="主页" v-model="form.homePage"></q-input>
                <!--位置-->
                <q-select filled label="location" v-model="form.location">
                    <template #prepend>
                        <q-icon name="language"></q-icon>
                    </template>
                </q-select>
                <!--地址-->
                <q-select filled label="position" v-model="form.position">
                    <template #prepend>
                        <q-icon name="place"></q-icon>
                    </template>
                </q-select>
                <q-btn class="full-width" color="green">提交</q-btn>
            </q-item-section>
        </q-item>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from 'boot/axios';

import { useUser } from 'stores/useUser';
import { UserInfo } from 'stores/schemas/user';

export default defineComponent({
    components: {},

    setup() {
        // 用户状态
        const self = useUser();
        return {
            self,
        };
    },

    data() {
        return {
            form: {
                avatar: '',
                company: '',
                github: '',
                homePage: '',
                introduction: '',
                location: '',
                position: '',
                username: '',
            },
        };
    },

    methods: {
        show_login() {
            // 弹出登录窗口
            this.self.alert_plain(1);
        },

        logout() {
            this.self.info = {} as UserInfo;
            this.self.userToken = this.self.resetToken = '';
            api.defaults.headers.common['Authorization'] = '';
        },
    },
});
</script>
