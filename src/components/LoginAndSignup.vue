<template>
    <q-card class="items-center q-pa-lg" style="width: 500px; max-width: 80vw;">
        <q-card-section class="row">
            <q-tabs v-model="self.loginPlain">
                <!--登录页面-->
                <q-tab :label="$t('login')" :name="1"></q-tab>
                <!--注册页面-->
                <q-tab :label="$t('signup')" :name="2"></q-tab>
            </q-tabs>
        </q-card-section>

        <q-card-section>
            <q-form>
                <!--名称+滑动动画-->
                <q-slide-transition appear>
                    <q-input
                        v-show="self.loginPlain>1"
                        v-model="form.name" :label="$t('form.name')"
                        name="name" outlined
                    ></q-input>
                </q-slide-transition>
                <!--账户-->
                <q-input
                    v-model="form.email" :label="$t('form.email')" class="q-my-md"
                    name="username" outlined
                ></q-input>
                <!--密码-->
                <q-input
                    v-model="form.pass" :label="$t('form.pass')" class="q-my-md"
                    name="password" outlined type="password"
                ></q-input>
                <!--确认密码+滑动动画-->
                <q-slide-transition appear>
                    <q-input
                        v-show="self.loginPlain>1"
                        v-model="form.repass" :label="$t('form.repass')"
                        name="repass" outlined
                    ></q-input>
                </q-slide-transition>

                <!--验证码-->
                <q-card-section class="q-py-md" horizontal>
                    <q-img
                        :ratio="2.5" :src="captchaUrl"
                        class="q-mr-md cursor-pointer" @click="getCaptchaId"
                    ></q-img>
                    <!--<q-img :ratio="3" class="q-mr-md" src="card-bg.jpg"></q-img>-->
                    <q-input v-model="form.v_code" :label="$t('form.v_code')" name="captchaCode"></q-input>
                </q-card-section>

                <!--登录按钮-->
                <q-btn v-if=" self.loginPlain < 2" class="full-width" color="primary" @click="submit">
                    {{ $t('login') }}
                </q-btn>
                <!--注册按钮-->
                <q-btn v-else class="full-width" color="teal-3">
                    {{ $t('signup') }}
                </q-btn>
            </q-form>

        </q-card-section>

        <!--第三方登录提示-->
        <!--{{ $t("login_tips.other_account") }}-->
        <q-separator></q-separator>

        <!--卡片底部-->
        <q-card-actions>
            <q-btn class="col" color="black">
                Github
            </q-btn>
            <q-btn class="col" color="info">
                QQ
            </q-btn>
            <q-btn class="col" color="teal-3">
                other
            </q-btn>
        </q-card-actions>


    </q-card>


</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
// 状态
import { useUser } from 'stores/useUser';
import { useQuasar } from 'quasar';

export default defineComponent({

    setup() {
        // 状态管理
        const self = useUser();
        const quasar = useQuasar();
        return {
            self,
            quasar,
        };
    },

    data() {
        return {
            // id码
            captchaId: '',
            // url路径
            captchaUrl: '',
            // 数据内容
            form: {
                name: '',
                email: '',
                pass: '',
                repass: '',
                v_code: '',
            },
        };

    },

    mounted() {
        // 打开弹窗时刷新验证码
        this.getCaptchaId();
    },

    methods: {
        // 获取新 id 与验证码图片
        getCaptchaId() {
            axios.get('https://mlog.club/api/captcha/request?captchaId=').then((req) => {
                this.captchaId = req.data.data.captchaId;
                this.captchaUrl = req.data.data.captchaUrl;
            });
        },

        // 提交内容
        submit() {
            // 表单
            const formTable = new FormData();
            formTable.append('captchaId', this.captchaId);
            formTable.append('captchaCode', this.form.v_code);
            formTable.append('username', this.form.email);
            formTable.append('password', this.form.pass);
            // 发送登录请求
            axios.post('https://mlog.club/api/login/signin', formTable).then((req) => {
                // 成功登录
                if (req.data.success) {
                    // 载入 token
                    this.self.userToken = req.data.data.token;
                    // 载入用户信息
                    this.self.info = req.data.data.user;
                    // 关闭登录栏
                    this.self.alert_plain(0);
                }
                // 信息提示
                this.quasar.notify({
                    message: req.data.message,
                    color: req.data.success ? 'green' : 'red',
                });

            });
        },

        // todo 第三方登录
        github() {
            this.quasar.notify({ message: 'github' });
        },

        qq() {
            this.quasar.notify({ message: 'qq' });
        },
    },
});
</script>

<style scoped>

</style>
