<template>
    <!--    &lt;!&ndash;主布局&ndash;&gt;-->
    <!--    <q-layout view="lHh Lpr lFf">-->

    <!--        &lt;!&ndash;顶部页首&ndash;&gt;-->
    <!--        <header-components></header-components>-->

    <!--        &lt;!&ndash;页面内容&ndash;&gt;-->
    <!--        <q-page-container>-->
    <!--            <main>-->
    <!--                <router-view></router-view>-->
    <!--            </main>-->
    <!--        </q-page-container>-->

    <!--        &lt;!&ndash;设置弹窗&ndash;&gt;-->
    <!--        &lt;!&ndash;todo&ndash;&gt;-->

    <!--        &lt;!&ndash;登录器弹窗&ndash;&gt;-->
    <!--        <q-dialog v-model="showLoginDialog" @hide="self.alert_plain(-1)">-->
    <!--            <login-and-signup></login-and-signup>-->
    <!--        </q-dialog>-->

    <!--        &lt;!&ndash;页尾&ndash;&gt;-->
    <!--        <footer-components v-if="0"></footer-components>-->
    <!--    </q-layout>-->

    <!--主布局-->
    <q-layout view="lHh Lpr lFf">

        <!--顶部页首-->
        <header-layout></header-layout>

        <!--页面内容-->
        <q-page-container>
            <div class="row q-mt-lg-lg q-mt-md-md q-mt-sm">
                <!--左侧空白-->
                <div class="col-0 col-lg-1"></div>

                <!--内容-->
                <div class="col-12 col-lg-10 q-pa-lg-none q-pa-md">
                    <router-view></router-view>
                </div>

                <!--右侧空白-->
                <div class="col-0 col-lg-1"></div>
            </div>
        </q-page-container>

        <!--设置弹窗-->
        <!--todo-->

        <!--登录器弹窗-->
        <q-dialog v-model="showLoginDialog" @hide="self.alert_plain(-1)">
            <login-and-signup></login-and-signup>
        </q-dialog>

        <!--页尾-->
        <footer-layout></footer-layout>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';

import { useUser } from 'stores/useUser';

import LoginAndSignup from 'components/verify/LoginAndSignup.vue';
import FooterLayout from 'layouts/FooterLayout.vue';
import HeaderLayout from 'layouts/HeaderLayout.vue';
import { useState } from 'stores/useState';

export default defineComponent({

    components: {
        HeaderLayout,
        FooterLayout,
        LoginAndSignup,
    },

    setup() {
        // 初始化设置

        let state = useState();
        state.$subscribe((mutation, state) => {
            // 本地存储
            localStorage.setItem('state', JSON.stringify(state));
        });
        const self = useUser();
        const quasar = useQuasar();
        // 非 200 状态响应报告错误
        axios.interceptors.response.use(null, function (req) {
            quasar.notify({
                message: 'error:' + req.response.data,
                color: 'red',
            });
        });
        return {
            state,
            self,
            quasar,
        };
    },

    data() {
        return {
            // 弹窗状态
            showLoginDialog: false,
        };
    },

    mounted() {
        // 初始化语言
        this.$i18n.locale = this.state.lang;
        // 初始化主题
        this.quasar.dark.set(this.state.theme == 'dark');
        // 初始化上次登录的身份信息
        let token = {
            a_token: localStorage.getItem('a_token') || '',
            r_token: localStorage.getItem('r_token') || '',
        };
        if (token.a_token && token.r_token) {
            this.self.user_login(token);
        }
    },

    methods: {},

    watch: {
        // 监听用户需求，弹出登录弹窗
        'self.loginPlain'() {
            this.showLoginDialog = this.self.loginPlain > 0;
        },
        // 用户登录状态变动，关闭登录弹窗
        'self.userToken'() {
            if (this.self.userToken) {
                this.self.alert_plain(0);
            }
        },
    },
});
</script>

<style scoped lang="scss">
</style>
