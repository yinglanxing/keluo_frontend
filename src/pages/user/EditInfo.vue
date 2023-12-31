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
            <!--<q-item-section avatar>-->
            <!--    <q-file v-model="target_file" label="头像"/>-->
            <!--</q-item-section>-->
            <q-item-section>
                <!--用户名-->
                <q-input label="名称" v-model="form.username"></q-input>
            </q-item-section>
        </q-item>
    </q-card>

    <div class="q-ma-md"></div>

    <q-card>
        <q-card-section>
            <div class="q-gutter-y-lg">
                <q-uploader
                    ref="uploader"
                    class="full-width"
                    :factory="factory"
                    :url="uploadUrl"
                    :headers="headers"
                    :with-credentials="false"
                    @added="onAddedFiles"
                    label="头像"
                />
                <!--介绍-->
                <q-input label="介绍" v-model="form.introduction"></q-input>
                <!--公司-->
                <q-input label="公司" v-model="form.company"></q-input>
                <!--git-->
                <q-input label="github" v-model="form.github"></q-input>
                <!--主页-->
                <q-input label="主页" v-model="form.homePage"></q-input>
                <!--位置-->
                <q-select label="location" v-model="form.location">
                    <template #prepend>
                        <q-icon name="language"></q-icon>
                    </template>
                </q-select>
                <!--地址-->
                <q-select label="position" v-model="form.position">
                    <template #prepend>
                        <q-icon name="place"></q-icon>
                    </template>
                </q-select>
                <q-btn class="full-width" color="green" @click="send_info">提交</q-btn>
            </div>
        </q-card-section>
        <q-inner-loading
            :showing="loading"
            label="Please wait..."
            label-class="text-teal"
            label-style="font-size: 1.1em"
        />
    </q-card>


</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from 'boot/axios';

import { useUser } from 'stores/useUser';
import { UserInfo } from 'stores/schemas/user';
import { OssToken } from 'src/stores/schemas/token';

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
                'avatar': '',
                'company': '',
                'github': '',
                'homePage': '',
                'introduction': '',
                'location': '',
                'position': '',
                'username': '',
            },
            loading: false,
            target_file: null,
            uploadUrl: '/api/v1/upload', // OSS 的 endpoint
            policyToken: {} as OssToken,
            headers: [], // 如果 OSS 额外的头部信息

        };
    },

    mounted() {
        api.get('/api/v1/policyToken').then((req) => {
            if (req.status == 200) {
                // 预备功能
                this.policyToken = req.data;
            }
        });
        this.form.avatar = this.self.info.avatar;
        this.form.github = this.self.info.github;
        this.form.username = this.self.info.username;
        this.form.position = this.self.info.position;
        this.form.introduction = this.self.info.introduction;
        this.form.homePage = this.self.info.homePage;
    },

    methods: {
        show_login() {
            // 弹出登录窗口
            this.self.alert_plain(1);
        },

        async onAddedFiles() {
            try {
                api.get('/api/v1/policyToken').then((req) => {
                    if (req.status == 200) {
                        this.policyToken = req.data;
                        this.$refs.uploader.upload(); // 触发上传
                    }
                });
            } catch (error) {
                console.error('Error getting policy token:', error);
            }
        },

        factory(file: File) {
            let formData = new FormData();
            formData.append('key', this.policyToken.dir + '/' + file.name);
            formData.append('policy', this.policyToken.policy);
            formData.append('OSSAccessKeyId', this.policyToken.accessid);
            formData.append('success_action_status', '200');
            formData.append('signature', this.policyToken.signature);
            formData.append('file', file);

            return {
                url: this.policyToken.host,
                method: 'POST',
                headers: this.headers,
                body: formData,
                sendRaw: true,
            };
        },

        // 提交信息
        send_info() {
            this.loading = true;
            api.post('/api/v1/user/profile', this.form).then((req) => {
                if (req.status == 200) {
                    this.loading = false;
                    this.self.flash_info();
                }
            });
        },

        logout() {
            this.self.info = {} as UserInfo;
            this.self.userToken = this.self.resetToken = '';
            api.defaults.headers.common['Authorization'] = '';
        },
    },

});
</script>
