<template>
    <q-form>
        <q-item>
            <q-item-section avatar>
                <!--头像-->
                <q-avatar icon="info"></q-avatar>
            </q-item-section>
            <q-item-section>
                正在进行手机号绑定
            </q-item-section>
            <q-item-section side>
                <q-btn color="red" @click="cancel">取消注册
                    <q-tooltip>
                        已经保存账号信息，下次请通过登录绑定手机。
                    </q-tooltip>
                </q-btn>
            </q-item-section>
        </q-item>
        <!--账户-->
        <q-input v-model="phone_number" class="q-my-md" name="phone" label="手机号" outlined></q-input>
        <!--手机验证码-->
        <q-input class="q-my-md" v-model="phone_code" label="验证码" name="phone_code" outlined>
            <template #append>
                <q-btn round icon="mail" color="orange" @click="submit_phone">
                    <q-tooltip>
                        手机验证码
                    </q-tooltip>
                </q-btn>
            </template>
        </q-input>
        <!-- 自动登录 -->
        <q-toggle v-model="auto_login_flag">绑定完成后自动登录</q-toggle>
        <!--登录按钮-->
        <q-btn :disable="!checked" class="full-width q-mt-md" color="green" @click="bind_phone">
            绑定
        </q-btn>
    </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {api} from 'boot/axios';

import { useUser } from 'stores/useUser';

export default defineComponent({
    setup() {

        const self = useUser();
        return {
            self,
        };
    },

    data() {
        return {
            // 数据内容
            token: '',
            phone_number: '',
            phone_code: '',
            auto_login_flag: false,
            checked: false,
        };
    },

    mounted() {
        // todo 判断是否已绑定
        this.token = localStorage.getItem('token') || '';
    },

    methods: {
        cancel() {
            // 取消行为
            this.token = '';
            localStorage.setItem('token', '');
            localStorage.setItem('token2', '');
            this.self.alert_plain(1);
        },

        auto_login() {
            this.self.user_login({
                a_token: localStorage.getItem('token') || '',
                r_token: localStorage.getItem('token2') || '',
            });
        },


        submit_phone() {
            if (this.token) {
                api.post('/api/v1/verify_phone?phone=' + this.phone_number).then((req) => {
                    if (req.status == 200) {
                        this.checked = true;
                    }
                });
            }
        },

        bind_phone() {
            if (this.token) {
                // 头部携带身份令牌
                api.post('/api/v1/bind_phone?phone=' + this.phone_number + '&code=' + this.phone_code, {}, {
                    headers: { Authorization: `Bearer ${this.token}` },
                }).then((req) => {
                    if (req.status == 200) {
                        // 打开自动登录
                        if (this.auto_login_flag) {
                            this.auto_login();
                        } else {
                            // 跳转到登录页面
                            this.self.alert_plain(1);
                        }
                    }
                });
            }
        },
    },
});
</script>
