<template>
    <!--默认布局-->
    <div>
        <!--主布局，style 自适应屏幕高度-->
        <a-layout style="height: 100vh">
            <!--页首-->
            <default-header></default-header>

            <!--embedded 增加背景对于header、卡片等组件的对比度-->
            <n-layout embedded content-style="padding: 24px">

                <a-grid :cols="24" :colGap="16" :rowGap="16">
                    <!--空白边-->
                    <a-grid-item :span="{xl:3}"></a-grid-item>


                    <!--内容-->
                    <a-grid-item :span="{xs:22, sm:22, xl:18}">


                        <a-grid :cols="24" :colGap="16" :rowGap="16">

                            <!--页面左侧边栏-->
                            <a-grid-item :span="5">
                                <default-left-sidebar></default-left-sidebar>
                            </a-grid-item>

                            <!--页面内容-->
                            <a-grid-item :span="14">
                                <!-- 顶部nav-->
                                <div style="margin-bottom: 12px">
                                    <default-nav></default-nav>
                                </div>
                                <slot/>
                            </a-grid-item>


                            <!--页面右侧边栏-->
                            <a-grid-item :span="5">
                                <default-right-sidebar></default-right-sidebar>
                            </a-grid-item>
                        </a-grid>

                    </a-grid-item>

                    <!--空白边-->
                    <a-grid-item :span="{xl:3}"></a-grid-item>
                </a-grid>

            </n-layout>

            <!--登录器-->
            <n-modal :on-after-leave="reset_login" v-model:show="show_login_plain">
                <login-and-signup></login-and-signup>
            </n-modal>

            <!--页尾-->
            <default-footer></default-footer>

        </a-layout>
    </div>
</template>

<script lang="ts">
export default {
    setup() {
        const show_login_plain = show_login()
        const show_signup_plain = show_signup()
        return {
            show_login_plain,
            alert_plane_func() {
                // 弹出登录框
                show_login_plain.value = true
            },
            reset_login() {
                // 重置到第一页
                show_signup_plain.value = false
            },
        }
    },
    data() {
        return {}
    }
}
</script>
<script setup lang="ts">
</script>

<!--<style scoped>-->
<!--.background {-->
<!--    background-color: #F2F3F5;-->
<!--}-->
<!--</style>-->
