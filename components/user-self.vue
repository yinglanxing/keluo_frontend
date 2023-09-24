<template>
    <!--弹窗登录-->

    <!--todo 全局登录状态-->
    <a-trigger :mouse-enter-delay="1000" :popup-translate="[0, 10]">
        <!--头像-->
        <a-avatar @click="alert_plane(1)">
            <icon-user/>
        </a-avatar>
        <!--内容-->
        <!-- Todo 该grid卡片后续将挪动到首页上显示，单独封装成一个组件-->
        <template #content>
            <login-tips></login-tips>
        </template>
    </a-trigger>

    <!--登录后显示自己-->
    <!--<popup-self></popup-self>-->

    <!--登录器-->
    <!--<n-modal v-model:show="plane_show">-->
    <!--    <login-and-signup></login-and-signup>-->
    <!--</n-modal>-->

</template>

<script lang="ts">
export default {
    setup() {
        const show_login_plain = show_login()
        return {
            show_login_plain,
            alert_plane(num: number = 0) {
                // 弹出登录框
                show_login_plain.value = num
            },
        }
    },
    data() {
        return {
            plane_show: false,
        }
    },
    methods: {}
}
</script>

<style scoped>

</style>
