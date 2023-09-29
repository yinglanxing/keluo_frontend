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
</template>

<script lang="ts">
export default {
    setup() {
        // 切换登录框
        const user_state = USER_STATE()
        return {
            alert_plane: user_state.alert_plain,
        }
    },
    data() {
        return {
            plane_show: false,
        }
    },
}
</script>

<style scoped>

</style>
