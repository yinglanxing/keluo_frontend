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
import {USER_STATE} from "~/composables/user";

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
    methods: {}
}
</script>

<style scoped>

</style>
