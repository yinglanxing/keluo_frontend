<template>
    <q-form>
        <q-item>
            <q-item-section avatar>
                <q-avatar icon="info"></q-avatar>
            </q-item-section>
            <q-item-section>
                <q-item-label>账号信息已保存,正在进行手机号绑定。</q-item-label>
            </q-item-section>
            <!-- 宽屏 -->
            <q-item-section class="xs-hide" side>
                <q-btn color="red" @click="cancel">返回</q-btn>
            </q-item-section>
        </q-item>
        <!-- 窄屏 -->
        <q-btn class="sm-hide md-hide lg-hide xl-hide full-width q-my-md" color="red" @click="cancel">返回</q-btn>
        <!--账户-->
        <q-input v-model="phone_number" :rules="rules.phone_number" lazy-rules class="q-my-xs" name="phone" label="手机号"
            outlined>
            <template #append>
                <q-btn :loading="loading" class="full-width" round icon="mail" color="orange" @click="show_dialog">
                    <template #loading>
                        <q-spinner-gears />
                    </template>
                    <q-tooltip>
                        手机验证码
                    </q-tooltip>
                </q-btn>
            </template>
        </q-input>
        <!--手机验证码-->
        <q-input class="q-my-xs" v-model="phone_code" lazy-rules :rules="rules.phone_code" label="验证码" name="phone_code"
            outlined></q-input>
        <!-- 自动登录 -->
        <q-toggle v-model="auto_login">绑定完成后自动登录</q-toggle>
        <!-- 自动登录 -->
        <q-toggle v-model="keep_login">保持账号10天身份</q-toggle>
        <!--登录按钮-->
        <q-btn class="full-width q-mt-xs" color="green" @click="bind_phone">
            绑定
        </q-btn>


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
                    <q-btn label="提交" color="primary" @click="submit_phone" v-close-popup />
                </q-card-actions>
            </q-card>

            <q-card flat bordered v-else>
                <q-card-section>
                    <div class="text-h6">请输入正确格式手机号码</div>
                </q-card-section>

                <q-card-actions>
                    <q-btn label="确定" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from 'boot/axios';

import { useUser } from 'stores/useUser';

import { check_rules } from 'src/utils/rulesCheck';

export default defineComponent({
    setup() {

        const self = useUser();
        return {
            self,
            rules: {
                phone_number: [
                    (val: string) => (val !== null && val !== '' || '请输入手机号'),
                    (val: string) => (val.length == 11 || '手机号格式不正确')
                ],
                phone_code: [
                    (val: string) => (val !== null && val !== '' || '请输入验证码'),
                    (val: string) => (val.length == 6 || '手机验证码长度应为6')
                ],
                // 验证码
                v_code: [
                    (val: string) => (val !== null && val !== '' || '输入不能为空'),
                    (val: string) => (val.length == 4 || '验证码长度应为4')
                ],
            }
        };
    },

    data() {
        return {
            // 数据内容
            phone_number: '',
            phone_code: '',
            // 自动登录
            auto_login: false,
            // 保持登录状态
            keep_login: false,
            // 验证码
            v_code: '',
            captchaId: '',
            captchaUrl: '',
            // 人机验证防御
            dialog: false,
            checked: false,
            loading: false,
        };
    },

    unmounted() {
        localStorage.setItem('token', '');
    },

    methods: {
        cancel() {
            // 取消行为
            localStorage.setItem('token', '');
            this.self.alert_plain(1);
        },

        show_dialog() {
            this.dialog = true;
            this.checked = check_rules({ phone_number: this.phone_number }, this.rules);
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

        submit_phone() {
            if (localStorage.getItem('token') && this.phone_number.length == 11, this.v_code.length == 4) {
                this.loading = true;
                api.post(`/api/v1/verify_phone?phone=${this.phone_number}&verify_code=${this.v_code}&verify_id=${this.captchaId}`).then((req) => {
                    if (req.status == 200) {
                        this.loading = false;
                    }
                });
            }
        },

        bind_phone() {
            if (localStorage.getItem('token') && this.phone_number.length == 11 && this.phone_code.length == 6) {
                // 头部携带身份令牌
                api.post('/api/v1/bind_phone?phone=' + this.phone_number + '&code=' + this.phone_code, {}, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }).then((req) => {
                    if (req.status == 200) {
                        // 自动登录
                        if (this.auto_login) {
                            this.self.user_login({
                                a_token: localStorage.getItem('token') || '',
                                r_token: localStorage.getItem('r_token') || '',
                                // 保存信息
                            }, this.keep_login ? 1 : 0);
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
