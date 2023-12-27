<template>
    <q-form>
        <!--名称-->
        <q-input class="q-my-md" v-model="form.name" :label="$t('form.name')" name="name" outlined></q-input>
        <!--账户-->
        <q-input v-model="form.email" :label="$t('form.email')" class="q-my-md" name="email" outlined></q-input>
        <!--密码-->
        <q-input v-model="form.pass" :label="$t('form.pass')" class="q-my-md" name="password" type="password" outlined
        ></q-input>
        <!--确认密码-->
        <q-input class="q-my-md" v-model="form.repass" :label="$t('form.repass')" name="repass" type="password" outlined
        ></q-input>
        <!--邮箱验证码-->
        <q-input class="q-mt-md" v-model="email_code" label="邮箱验证码" name="email_code" outlined
                 @keyup.enter="submit">
            <template #append>
                <q-btn class="full-width" color="warning" icon="email" round @click="check_email">
                    <q-tooltip>
                        发送邮箱验证码
                    </q-tooltip>
                </q-btn>
            </template>
        </q-input>
        <!--&lt;!&ndash; 自动登录 &ndash;&gt;-->
        <!--<q-toggle v-model="auto_login">注册完成后自动登录</q-toggle>-->
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
        <q-btn :disable="!email_checked" class="full-width q-mt-md" color="green-3" @click="submit">
            {{ $t('signup') }}
        </q-btn>
    </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

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
            form: {
                name: '',
                email: '',
                pass: '',
                repass: '',
            },
            email_code: '',
            auto_login: false,
            email_checked: false,
            // 验证码相关
            captchaId: '',
            captchaUrl: '',
            v_code: '',
            error_count: 0,
        };
    },

    methods: {
        check_email() {
            if (this.form.email) {
                axios.get('/api/v1/email_verify?email=' + this.form.email).then((req) => {
                    if (req.status == 200) {
                        // 以发送验证码
                        this.email_checked = true;
                    }
                });
            }
        },

        // 获取 form 数据
        getForm() {
            const formTable = new FormData();
            if (this.form.pass != this.form.repass) {
                throw Error(this.$t('different_passwords'));
            }
            formTable.append('email', this.form.email);
            formTable.append('password', this.form.pass);
            formTable.append('username', this.form.name);
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

        // 注册
        submit() {
            const formData = this.getForm();
            axios.post('/api/v1/signup?code=' + this.email_code, formData).then((req) => {
                if (req.status == 200) {
                    // 自动登录开启
                    // if (this.auto_login) {
                    // 主动获取身份后跳转到手机号绑定
                    this.login(formData);
                    // }
                } else {
                    this.error_count++;
                }
            });
        },

        // 登录
        login(formData: object) {
            axios.post('/api/v1/login', formData).then((req) => {
                if (req.status == 200) {
                    this.self.user_login(req.data);
                } else {
                    this.error_count++;
                }
            });
        },
    },
});
</script>
