<template>
    <q-form>
        <!--名称-->
        <q-input v-model="form.name" lazy-rules :rules="rules.name" :label="$t('form.name')" class="q-my-xs" name="name"
            outlined></q-input>
        <!--账户-->
        <q-input v-model="form.email" lazy-rules :rules="rules.email" :label="$t('form.email')" class="q-my-xs" name="email"
            outlined></q-input>
        <!--密码-->
        <q-input v-model="form.pass" :rules="rules.pass" debounce="500" :label="$t('form.pass')" class="q-my-xs"
            name="password" type="password" outlined autocomplete="off">
            <template #append>
                <!-- 密码强度提醒 -->
                <q-icon v-if="pass_level.level" name="lock" :color="pass_level.color">
                    <q-tooltip>
                        建议长度8位以上，包含数字、字母大写、字母小写与特殊字符
                    </q-tooltip>
                </q-icon>
            </template>
        </q-input>
        <!--确认密码-->
        <q-input class="q-my-xs" v-model="form.repass" lazy-rules :rules="rules.repass" :label="$t('form.repass')"
            name="repass" type="password" outlined autocomplete="off"></q-input>
        <!--邮箱验证码-->
        <q-input class="q-my-xs" v-model="email_code" lazy-rules :rules="rules.email_code" label="邮箱验证码" name="email_code"
            outlined @keyup.enter="submit">
            <template #append>
                <q-btn :loading="loading" class="full-width" color="warning" icon="email" round @click="check_email">
                    <template #loading>
                        <q-spinner-gears />
                    </template>
                    <q-tooltip>
                        发送邮箱验证码
                    </q-tooltip>
                </q-btn>
            </template>
        </q-input>
        <!--&lt;!&ndash; 自动登录 &ndash;&gt;-->
        <!--<q-toggle v-model="auto_login">注册完成后自动登录</q-toggle>-->
        <!--验证码-->
        <!--邀请码-->
        <q-input class="q-my-xs" lazy-rules :rules="rules.inv_code" v-model="inv_code" label="邀请码" name="invitation"
            outlined></q-input>
        <q-card-section horizontal v-show="error_count > 2">
            <q-input v-model="v_code" lazy-rules :rules="rules.v_code" :label="$t('form.v_code')" name="captchaCode">
                <template #after>
                    <q-btn @click="get_captcha_id">
                        <q-img :src="captchaUrl" style="height: 40px; width: 200px" :ratio="1"
                            class="q-mt-md cursor-pointer bd1"></q-img>
                    </q-btn>
                </template>
            </q-input>
        </q-card-section>
        <!--登录按钮-->
        <q-btn class="full-width q-mt-md" color="green-3" @click="submit">
            {{ $t('signup') }}
        </q-btn>
    </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from 'boot/axios';

import { useUser } from 'stores/useUser';

import { check_rules } from 'src/utils/rulesCheck';
import { check_week_pass } from 'src/utils/weakPass';

export default defineComponent({
    setup() {

        const self = useUser();
        return {
            self,
        };
    },

    data() {
        let form = {
            name: '',
            email: '',
            pass: '',
            repass: '',
        };

        let pass_level = {
            level: 0,
            color: '',
        };

        return {
            // 数据内容
            rules: {
                // 名称
                name: [
                    (val: string) => (val !== null && val !== '' || '输入不能为空'),
                    (val: string) => (val.length > 1 && val.length <= 16 || '长度不小于2不大于16'),
                ],
                // 邮箱
                email: [
                    (val: string) => (val !== null && val !== '' || '账号输入不能为空'),
                    (val: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || '账号格式不正确')
                ],
                // 密码
                pass: [
                    (val: string) => (val !== null && val !== '' || '输入不能为空'),
                    (val: string) => (val.length >= 6 && val.length <= 18 || '密码长度应为6到18'),
                    (val: string) => (val.length && pass_level.level != 0 || '密码强度不足'),
                ],
                // 确认密码
                repass: [
                    (val: string) => (val !== null && val !== '' || '输入不能为空'),
                    (val: string) => (val == form.pass || '两次密码输入不同'),
                ],
                // 邮箱验证码
                email_code: [
                    (val: string) => (val !== null && val !== '' || '输入不能为空'),
                    (val: string) => (val.length == 6 || '验证码长度应为6'),
                ],
                // 邀请码
                inv_code: [
                    (val: string) => (val !== null && val !== '' || '输入不能为空'),
                    (val: string) => (val.length == 10 || '邀请码长度应为10')
                ],
                // 验证码
                v_code: [
                    (val: string) => (val !== null && val !== '' || '输入不能为空'),
                    (val: string) => (val.length == 6 || '验证码长度应为6')
                ],
            },
            form,
            email_code: '',
            inv_code: '',
            auto_login: false,
            loading: false,
            // 验证码相关
            captchaId: '',
            captchaUrl: '',
            v_code: '',
            error_count: 0,
            pass_level,
        };
    },

    methods: {
        check_email() {
            if (check_rules({ email: this.form.email }, this.rules)) {
                this.loading = true;
                api.get('/api/v1/email_verify?email=' + this.form.email).then((req) => {
                    if (req.status == 200) {
                        // 以发送验证码
                        this.loading = false;
                    }
                });
            }
        },

        // 获取 form 数据
        get_form() {
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
        get_captcha_id() {
            api.get('/api/v1/captcha').then((req) => {
                if (req.status == 200) {
                    this.captchaId = req.data.id;
                    this.captchaUrl = req.data.image;
                }
            },
            );
        },

        // 注册
        submit() {
            if (check_rules(this.form, this.rules)) {
                const formData = this.get_form();
                // 附加邀请码
                formData.append('invitation', this.inv_code);
                api.post('/api/v1/signup?code=' + this.email_code, formData).then((req) => {
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
            }
        },

        // 登录
        login(formData: object) {
            api.post('/api/v1/login', formData).then((req) => {
                if (req.status == 200) {
                    this.self.user_login(req.data);
                } else {
                    this.error_count++;
                }
            });
        },
    },
    watch: {
        'form.pass'() {
            // q-input debounce="500" 延时触发
            this.pass_level.level = check_week_pass(this.form.pass);
            // 根据等级赋予颜色
            if (this.pass_level.level == 0) {
                this.pass_level.color = '';
            } else if (this.pass_level.level == 1) {
                this.pass_level.color = 'red';
            } else if (this.pass_level.level == 2) {
                this.pass_level.color = 'yellow';
            } else if (this.pass_level.level == 3) {
                this.pass_level.color = 'green';
            }
        }
    },

});
</script>
