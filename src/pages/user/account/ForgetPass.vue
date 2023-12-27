<template>
    <div class="q-pa-md">
        <q-stepper v-model="step" vertical color="primary" animated>
            <q-step :name="1" title="须知事项" :done="step > 1">
                ............................................................
                ............................................................
                ............................................................
                ............................................................
                <q-stepper-navigation>
                    <q-btn @click="step = 2" color="red" label="我已知晓" />
                </q-stepper-navigation>
            </q-step>

            <q-step :name="2" title="输入账号" icon="assignment" :done="step > 2">
                <q-input v-model="email" name="email" type="email" label="邮箱">
                    <template #prepend>
                        <q-icon name="person" />
                    </template>
                </q-input>
                <q-stepper-navigation>
                    <q-btn @click="send_email" color="primary" label="提交" />
                    <q-btn @click="step = 1" color="green" label="返回" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>

            <q-step :name="3" title="重置账号" icon="assignment" :done="step > 2">
                <q-input v-model="pass" name="password" type="password" label="密码">
                    <template #prepend>
                        <q-icon name="lock" />
                    </template>
                </q-input>
                <q-input v-model="re_pass" name="password" type="password" label="确认密码">
                    <template #prepend>
                        <q-icon name="lock" />
                    </template>
                </q-input>
                <q-input v-model="code" name="code" label="验证码">
                    <template #prepend>
                        <q-icon name="article" />
                    </template>
                </q-input>
                <q-stepper-navigation>
                    <q-btn @click="reset_account" color="primary" label="提交" />
                    <q-btn @click="step = 1" color="green" label="返回" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>

            <q-step :name="4" title="重置成功" icon="assignment">
                成功重置密码，请重新登录
                <q-stepper-navigation>
                    <q-btn color="primary" to="/">
                        {{ $t("back") }}
                    </q-btn>
                </q-stepper-navigation>
            </q-step>
        </q-stepper>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {api} from 'boot/axios';

export default defineComponent({
    data() {
        return {
            step: 1,
            email: '',
            code: '',
            pass: '',
            re_pass: '',
        };
    },

    methods: {
        send_email() {
            api.get('/api/v1/reset_verify?email' + this.email).then((req) => {
                if (req.status == 200) {
                    this.step = 3;
                }
            });
        },
        reset_account() {
            const formTable = new FormData();
            if (this.pass != this.re_pass) {
                throw Error(this.$t('different_passwords'));
            }
            if (this.code.length < 5) {
                throw Error('验证码不足六位');
            }
            formTable.append('email', this.email);
            formTable.append('password', this.pass);
            api.post('/api/v1/reset_password', formTable).then((req) => {
                if (req.status == 200) {
                    this.step = 4;
                }
            });
        },
    }
});
</script>
