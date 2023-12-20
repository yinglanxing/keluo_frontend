<template>
    <q-slide-transition>
        <q-form v-show="show_temp">
            <!--名称-->
            <q-input class="q-my-md" v-model="form.name" :label="$t('form.name')" name="name" outlined></q-input>
            <!--账户-->
            <q-input v-model="form.email" :label="$t('form.email')" class="q-my-md" name="emial" outlined></q-input>
            <!--密码-->
            <q-input v-model="form.pass" :label="$t('form.pass')" class="q-my-md" name="password" outlined
                type="password"></q-input>
            <!--确认密码-->
            <q-input class="q-my-md" v-model="form.repass" :label="$t('form.repass')" name="repass" outlined
                @keyup.enter="submit"></q-input>
            <!--邮箱验证码-->
            <q-btn class="full-width" color="warning" @click="check_email">验证邮箱
                <q-tooltip>
                    发送邮箱验证码
                </q-tooltip>
            </q-btn>
            <q-input class="q-my-md" v-model="email_code" label="邮箱验证码" name="email_code" outlined
                @keyup.enter="submit"></q-input>
            <!-- 自动登录 -->
            <q-toggle v-model="auto_login">注册完成后自动登录</q-toggle>
            <!--验证码-->
            <slot name="code"></slot>
            <!--登录按钮-->
            <q-btn :disable="!email_checked" class="full-width q-mt-md" color="green-3" @click="submit">
                {{ $t('signup') }}
            </q-btn>
        </q-form>
    </q-slide-transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

import { useUser } from 'stores/useUser';

export default defineComponent({
    props: {
        show_temp: {
            type: Boolean,
            default: false,
        },
        callback: {
            type: Function,
            required: true,
        },
    },

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
        };
    },

    methods: {
        check_email() {
            if (this.form.email) {
                axios.get('/api/v1/email_verify?email' + this.form.email).then((req) => {
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
            if (this.email_code.length == 6 && this.email_checked) {
                throw Error('验证码不足六位');
            }
            formTable.append('email', this.form.email);
            formTable.append('password', this.form.pass);
            formTable.append('username', this.form.name);
            return formTable;
        },

        // 注册
        submit() {
            const formData = this.getForm();
            axios.post('/api/v1/signup?code=' + this.email_code, formData).then((req) => {
                if (req.status == 200) {
                    // 自动登录开启
                    if (this.auto_login) {
                        this.login(formData);
                    }
                }
            }).catch(() => {
                this.callback();
            });
        },

        // 登录
        login(formData: object) {
            axios.post('/api/v1/login', formData).then((req) => {
                if (req.status == 200) {
                    this.self.user_login(req.data);
                }
            }).then(() => {
                this.callback();
            });
        }
    },
});
</script>
