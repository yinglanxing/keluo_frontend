<template>
    <q-form>
        <!--账户-->
        <q-input v-model="form.email" lazy-rules :rules="rules.email" :label="$t('form.email')" class="q-my-xs"
            name="username" outlined></q-input>
        <!--密码-->
        <q-input v-model="form.pass" lazy-rules :rules="rules.pass" :label="$t('form.pass')" class="q-my-xs" name="password"
            outlined type="password" @keyup.enter="submit" autocomplete="off"></q-input>
        <!--验证码-->
        <q-card-section horizontal v-show="error_count > 2">
            <!--<q-img-->
            <!--    :src="captchaUrl"-->
            <!--    class="q-mt-md cursor-pointer lh-9" @click="getCaptchaId"-->
            <!--&gt;</q-img>-->
            <!--<q-input v-model="v_code" :label="$t('form.v_code')" class="lh-9"-->
            <!--         name="captchaCode"></q-input>-->
            <q-input v-model="v_code" :label="$t('form.v_code')" name="captchaCode">
                <template #after>
                    <q-btn @click="get_captcha_id">
                        <q-img :src="captchaUrl" style="height: 40px; width: 200px" :ratio="1"
                            class="q-mt-md cursor-pointer bd1"></q-img>
                    </q-btn>
                </template>
            </q-input>
        </q-card-section>
        <!--登录按钮-->
        <q-btn class="full-width q-mt-md" color="primary" @click="submit">
            {{ $t('login') }}
        </q-btn>
    </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from 'boot/axios';

import { useUser } from 'stores/useUser';

import { check_rules } from '../../utils/rulesCheck';

export default defineComponent({
    name: 'EmailLogin',

    setup() {

        const self = useUser();
        return {
            self,
            rules: {
                email: [
                    (val: string) => (val !== null && val !== '' || '请输入账号'),
                    (val: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || '账号格式不正确')
                ],
                pass: [
                    (val: string) => (val !== null && val !== '' || '请输入密码'),
                    (val: string) => (val.length >= 6 && val.length <= 18 || '密码长度应为6到18'),
                ],
            },
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
        get_form() {
            const formTable = new FormData();
            formTable.append('email', this.form.email);
            formTable.append('password', this.form.pass);
            return formTable;
        },

        // 获取验证码
        get_captcha_id() {
            api.get('/api/v1/captcha').then((req) => {
                if (req.status == 200) {
                    this.captchaId = req.data.id;
                    this.captchaUrl = req.data.image;
                }
            },
            );
        },

        // 登录
        submit() {
            if (check_rules(this.form, this.rules)) {
                // 获取参数
                const formData = this.get_form();
                api.post('/api/v1/login', formData).then((req) => {
                    if (req.status == 200) {
                        this.self.user_login(req.data);
                    } else {
                        this.error_count++;
                    }
                });
            }
        },
    },
    watch: {
        error_count() {
            if (this.error_count > 2) {
                // 刷新验证码
                this.get_captcha_id();
            }
        },
    },
});
</script>
