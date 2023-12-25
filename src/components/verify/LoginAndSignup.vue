<template>
    <q-card class="items-center q-pa-lg" style="width: 500px; max-width: 80vw">
        <q-card-section class="row">
            <q-tabs v-model="self.loginPlain">
                <!--登录页面-->
                <q-tab :label="$t('login')" :name="1"> </q-tab>
                <!--注册页面-->
                <q-tab :label="$t('signup')" :name="2"></q-tab>
            </q-tabs>
        </q-card-section>
        <q-card-section>
            <!--            <q-slide-transition>-->
            <!--                <q-form v-show="self.loginPlain < 3">-->
            <!--                    &lt;!&ndash;名称+滑动动画&ndash;&gt;-->
            <!--                    <q-slide-transition appear>-->
            <!--                        <q-input-->
            <!--                            class="q-my-md"-->
            <!--                            v-show="self.loginPlain > 1"-->
            <!--                            v-model="form.name" :label="$t('form.name')"-->
            <!--                            name="name" outlined-->
            <!--                        ></q-input>-->
            <!--                    </q-slide-transition>-->
            <!--                    &lt;!&ndash;账户&ndash;&gt;-->
            <!--                    <q-input-->
            <!--                        v-model="form.email" :label="$t('form.email')" class="q-my-md"-->
            <!--                        name="username" outlined-->
            <!--                    ></q-input>-->
            <!--                    &lt;!&ndash;密码&ndash;&gt;-->
            <!--                    <q-input-->
            <!--                        v-model="form.pass" :label="$t('form.pass')" class="q-my-md"-->
            <!--                        name="password" outlined type="password"-->
            <!--                    ></q-input>-->
            <!--                    &lt;!&ndash;确认密码+滑动动画&ndash;&gt;-->
            <!--                    <q-slide-transition appear>-->
            <!--                        <q-input-->
            <!--                            class="q-my-md"-->
            <!--                            v-show="self.loginPlain>1"-->
            <!--                            v-model="form.repass" :label="$t('form.repass')"-->
            <!--                            name="repass" outlined-->
            <!--                        ></q-input>-->
            <!--                    </q-slide-transition>-->

            <!--                    &lt;!&ndash;验证码&ndash;&gt;-->
            <!--                    <q-card-section horizontal v-show="error_count>2">-->
            <!--                        <q-img-->
            <!--                             :src="captchaUrl"-->
            <!--                            class="q-mt-md cursor-pointer lh-9" @click="getCaptchaId"-->
            <!--                        ></q-img>-->
            <!--                        <q-input v-model="form.v_code" :label="$t('form.v_code')" class="lh-9" name="captchaCode"></q-input>-->
            <!--                    </q-card-section>-->

            <!--                    &lt;!&ndash;登录按钮&ndash;&gt;-->
            <!--                    <q-btn-->
            <!--                        class="full-width q-mt-md"-->
            <!--                        :color="self.loginPlain < 2? 'primary':'green-3'"-->
            <!--                        @click="submit">-->
            <!--                        {{ self.loginPlain < 2?$t('login'):$t('signup') }}-->
            <!--                    </q-btn>-->
            <!--                </q-form>-->
            <!--            </q-slide-transition>-->

            <!--            <q-slide-transition>-->
            <!--                <q-form v-show="self.loginPlain == 3">-->
            <!--                </q-form>-->
            <!--            </q-slide-transition>-->
            <!--邮箱登录-->
            <q-slide-transition>
                <email-login v-show="self.loginPlain == 1"></email-login>
            </q-slide-transition>
            <!--用户注册-->
            <q-slide-transition>
                <user-signup v-show="self.loginPlain == 2"></user-signup>
            </q-slide-transition>
            <!--手机号绑定-->
            <q-slide-transition>
                <bind-phone v-show="self.loginPlain == 3"></bind-phone>
            </q-slide-transition>
        </q-card-section>

        <!--第三方登录提示-->
        <!--{{ $t("login_tips.other_account") }}-->
        <q-separator></q-separator>

        <!--卡片底部-->
        <q-card-actions>
            <q-btn class="col" color="black"> Github </q-btn>
            <q-btn class="col" color="info"> QQ </q-btn>
            <q-btn class="col" to="/account_help/forget_pass"> 忘记密码 </q-btn>
        </q-card-actions>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from 'boot/axios';

import { useUser } from 'stores/useUser';

import UserSignup from 'components/verify/UserSignup.vue';
import EmailLogin from 'components/verify/EmailLogin.vue';
import BindPhone from 'components/verify/BindPhone.vue';

export default defineComponent({
    components: {
        BindPhone,
        EmailLogin,
        UserSignup,
    },

    setup() {
        const self = useUser();
        return {
            self,
        };
    },
});
</script>

<style scoped></style>
