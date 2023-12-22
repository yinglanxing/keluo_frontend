<template>
    <q-form>
        <!--账户-->
        <q-input
            v-model="form.email" :label="$t('form.email')" class="q-my-md"
            name="username" outlined
        ></q-input>
        <!--密码-->
        <q-input
            v-model="form.pass" :label="$t('form.pass')" class="q-my-md"
            name="password" outlined type="password"
            @keyup.enter="submit"
        ></q-input>
        <!--验证码-->
        <q-card-section horizontal v-show="error_count>2">
            <q-img
                :src="captchaUrl"
                class="q-mt-md cursor-pointer lh-9" @click="getCaptchaId"
            ></q-img>
            <q-input v-model="v_code" :label="$t('form.v_code')" class="lh-9"
                     name="captchaCode"></q-input>
        </q-card-section>
        <!--登录按钮-->
        <q-btn
            class="full-width q-mt-md"
            color="primary"
            @click="submit">
            {{ $t('login') }}
        </q-btn>
    </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

import { useUser } from 'stores/useUser';

export default defineComponent({
    name: 'EmailLogin',

    setup() {

        const self = useUser();
        return {
            self,
        };
    },

    data() {
        return {
            // 数据内容
            form: {
                email: '',
                pass: '',
            },
            // 验证码相关
            captchaId: '',
            captchaUrl: '',
            v_code: '',
            error_count: 0,
        };
    },

    methods: {
        // 获取 form 数据
        getForm() {
            const formTable = new FormData();
            formTable.append('email', this.form.email);
            formTable.append('password', this.form.pass);
            return formTable;
        },

        // 获取验证码
        getCaptchaId() {
            axios.get('/api/v1/captcha').then((req) => {
                    if (req.status == 200) {
                        this.captchaId = req.data.id;
                        this.captchaUrl = req.data.image;
                    }
                },
            );
        },

        // 登录或注册
        submit() {
            // 获取参数
            const formData = this.getForm();
            axios.post('/api/v1/login', formData).then((req) => {
                if (req.status == 200) {
                    this.self.user_login(req.data);
                } else {
                    this.error_count++;
                }
            });
        },
    },
    watch: {
        error_count() {
            if (this.error_count > 2) {
                // 刷新验证码
                this.getCaptchaId();
            }
        },
    },
});
</script>
