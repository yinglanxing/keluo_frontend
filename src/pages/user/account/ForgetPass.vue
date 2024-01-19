<template>
    <div class="q-pa-md">
        <q-stepper v-model="step" vertical color="primary" animated>
            <q-step :name="1" title="须知事项" :done="step > 1">
                ...
                <q-stepper-navigation>
                    <q-btn @click="step = 2" color="red" label="我已知晓" />
                </q-stepper-navigation>
            </q-step>

            <q-step :name="2" title="请输入邮箱账号" icon="assignment" :done="step > 2">
                <!--邮箱账户-->
                <q-input v-model="form.email" lazy-rules :rules="rules.email" :label="$t('form.email')" class="q-my-xs"
                    name="email" outlined>
                </q-input>
                <q-stepper-navigation>
                    <q-btn @click="show_dialog" color="primary" label="提交" />
                    <q-btn @click="step = 1" color="green" label="返回" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>

            <q-step :name="3" title="重置账号" icon="assignment" :done="step > 2">
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
                <q-input class="q-my-xs" v-model="email_code" lazy-rules :rules="rules.email_code" label="邮箱验证码"
                    name="email_code" outlined @keyup.enter="reset_account"></q-input>
                <q-stepper-navigation>
                    <q-btn @click="reset_account" color="primary" label="提交" />
                    <q-btn @click="step = 1" color="green" label="返回" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>

            <q-step :name="4" title="重置成功" icon="assignment">
                成功重置密码，请重新登录
                <q-stepper-navigation>
                    <q-btn color="primary" to="/">
                        {{ $t('back') }}
                    </q-btn>
                </q-stepper-navigation>
            </q-step>
        </q-stepper>



        <!-- 验证码弹窗 -->
        <q-dialog v-model="dialog">
            <q-card flat bordered v-if="checked">
                <q-card-section>
                    <div class="text-h6">请输入验证码</div>
                </q-card-section>

                <q-card-section>
                    <!--验证码-->
                    <q-input v-model="v_code" :rules="rules.v_code" :label="$t('form.v_code')" name="captchaCode">
                        <template #after>
                            <q-btn @click="get_captcha_id">
                                <q-img :src="captchaUrl" style="height: 40px; width: 200px" :ratio="1"
                                    class="q-mt-md cursor-pointer bd1"></q-img>
                            </q-btn>
                        </template>
                    </q-input>
                </q-card-section>

                <q-card-actions>
                    <q-btn label="提交" color="primary" @click="send_email" v-close-popup />
                </q-card-actions>
            </q-card>

            <q-card flat bordered v-else>
                <q-card-section>
                    <div class="text-h6">请输入正确格式邮箱</div>
                </q-card-section>

                <q-card-actions>
                    <q-btn label="确定" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from 'boot/axios';

import { check_rules } from 'src/utils/rulesCheck';
import { check_week_pass } from 'src/utils/weakPass';

export default defineComponent({
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
            rules: {
                // 邮箱
                email: [
                    (val: string) => (val !== null && val !== '' || '账号输入不能为空'),
                    (val: string) => (/^[^\s@]{2,}@[^\s@]{2,}\.[^\s@]{2,}$/.test(val) || '账号格式不正确')
                ],
                // 密码
                pass: [
                    (val: string) => (val !== null && val !== '' || '输入不能为空'),
                    (val: string) => (val.length >= 6 && val.length <= 18 || '密码长度应为6到18'),
                    (val: string) => (val.length && pass_level.level != 0 || '请不要使用连续数字或英文大小写'),
                ],
                // 确认密码
                repass: [
                    (val: string) => (val !== null && val !== '' || '输入不能为空'),
                    (val: string) => (val == form.pass || '两次密码输入不同'),
                ],
                // 邮箱验证码
                email_code: [
                    (val: string) => (val !== null && val !== '' || '输入不能为空'),
                    (val: string) => (val.length == 6 || '邮箱验证码长度应为6'),
                ],
                // 验证码
                v_code: [
                    (val: string) => (val !== null && val !== '' || '输入不能为空'),
                    (val: string) => (val.length == 4 || '验证码长度应为4')
                ],
            },
            form,
            // 密码强度
            // 邮箱验证码
            email_code: '',
            // 验证码
            v_code: '',
            captchaId: '',
            captchaUrl: '',
            // 人机验证防御
            dialog: false,
            checked: false,
            loading: false,
            // 密码强度
            pass_level,
            // 步骤
            step: 1,
        };
    },

    methods: {
        show_dialog() {
            this.dialog = true;
            this.checked = check_rules({ email: this.form.email }, this.rules);
            this.get_captcha_id();
        },

        // 获取验证码
        get_captcha_id() {
            api.get('/api/v1/captcha').then((req) => {
                if (req.status == 200) {
                    this.captchaId = req.data.id;
                    this.captchaUrl = req.data.image;
                }
            });
        },
        send_email() {
            // 检查邮箱与验证码
            if (check_rules({ email: this.form.email, v_code: this.v_code }, this.rules)) {
                api.get(`'/api/v1/reset_verify?email=${this.form.email}&verify_code=${this.v_code}&verify_id=${this.captchaId}`).then((req) => {
                    if (req.status == 200) {
                        this.step = 3;
                    }
                });
            }
        },
        reset_account() {
            // 检查完整表单
            if (check_rules({ ...this.form, email_code: this.email_code }, this.rules)) {
                const formTable = new FormData();
                formTable.append('email', this.form.email);
                formTable.append('password', this.form.pass);
                api.post('/api/v1/reset_password?code=' + this.email_code, formTable).then((req) => {
                    if (req.status == 200) {
                        this.step = 4;
                    }
                });
            }
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
