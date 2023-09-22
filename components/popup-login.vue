<template>
    <!--弹窗登录-->

    <!--todo 全局登录状态-->
    <a-popover :show-arrow="false">
        <!--头像-->
        <n-space>
            <n-button @click="alert_plane_func" size="large" circle>
                <template #icon>
                    <icon-user/>
                </template>
            </n-button>
        </n-space>
        <!--内容-->
        <!-- Todo 该grid卡片后续将挪动到首页上显示，单独封装成一个组件-->
        <template #content>
            <login-tips></login-tips>
        </template>
    </a-popover>

    <!--登录后显示自己-->
    <!--<popup-self></popup-self>-->

    <!--登录器-->
    <n-modal v-model:show="plane_show">
        <login-and-signup></login-and-signup>
    </n-modal>

</template>

<script lang="ts">
export default {
    data() {
        return {
            plane_show: false,
        }
    },
    methods: {
        // 弹出登录框
        alert_plane_func() {
            this.plane_show = true
        }
    }
}
</script>

<style scoped>

</style>
