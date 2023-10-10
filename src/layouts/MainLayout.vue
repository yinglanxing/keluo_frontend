<template>
    <!--主布局-->
    <q-layout view="lHh Lpr lFf">

        <!--顶部页首-->
        <header-components></header-components>

        <!--页面内容-->
        <q-page-container>
            <div class="row q-mt-lg-lg q-mt-md-md q-mt-sm">
                <!--左侧空白-->
                <div class="col-0 col-lg-1"></div>

                <!--内容-->
                <div class="col-12 col-lg-10">
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
        <footer-components></footer-components>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// 状态
import { useUser } from 'stores/useUser';
// 组件
import header from 'components/Header.vue';
import footer from 'components/Footer.vue';
import LoginAndSignup from 'components/LoginAndSignup.vue';

export default defineComponent({
    name: 'MainLayout',

    // 引用组件
    components: {
        HeaderComponents: header,
        FooterComponents: footer,
        LoginAndSignup,
    },

    setup() {
        // 状态管理
        const self = useUser();
        return {
            self,
        };
    },

    data() {
        return {
            // 弹窗状态
            showLoginDialog: false,
            showSettingDialog: false,
        };
    },

    methods: {},

    watch: {
        // 监听用户需求，弹出登录弹窗
        'self.loginPlain'() {
            this.showLoginDialog = this.self.loginPlain > 0;
        },
        // 用户登录状态变动，关闭登录弹窗
        'self.userToken'() {
            if (this.self.isLogin) {
                this.self.alert_plain(0);
            }
        },
    },
});
</script>
