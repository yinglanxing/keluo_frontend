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
                <q-btn :loading="loading" class="full-width" round icon="mail" color="orange" @click="submit_phone">
                    <template #loading>
                        <q-spinner-gears/>
                    </template>
                    <q-tooltip>
                        手机验证码
                    </q-tooltip>
                </q-btn>
            </template>
        </q-input>
        <!-- 自动登录 -->
        <q-toggle v-model="auto_login">绑定完成后自动登录</q-toggle>
        <!--登录按钮-->
        <q-btn class="full-width q-mt-md" color="green" @click="bind_phone">
            绑定
        </q-btn>
    </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from 'boot/axios';

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
            phone_number: '',
            phone_code: '',
            auto_login: false,
            loading: false,
        };
    },

    unmounted() {
        localStorage.setItem('token', '');
        localStorage.setItem('r_token', '');
    },

    methods: {
        cancel() {
            // 取消行为
            localStorage.setItem('token', '');
            localStorage.setItem('r_token', '');
            this.self.alert_plain(1);
        },

        submit_phone() {
            if (localStorage.getItem('token') && this.phone_number.length > 10) {
                this.loading = true;
                api.post('/api/v1/verify_phone?phone=' + this.phone_number).then((req) => {
                    if (req.status == 200) {
                        this.loading = false;
                    }
                });
            }
        },

        bind_phone() {
            if (localStorage.getItem('token') && this.phone_number.length > 10 && this.phone_code.length) {
                // 头部携带身份令牌
                api.post('/api/v1/bind_phone?phone=' + this.phone_number + '&code=' + this.phone_code, {}, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }).then((req) => {
                    if (req.status == 200) {
                        // 打开自动登录
                        if (this.auto_login) {
                            this.self.user_login({
                                a_token: localStorage.getItem('token') || '',
                                r_token: localStorage.getItem('r_token') || '',
                            });
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
