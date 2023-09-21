<template>
    <!--弹窗登录-->

    <a-popover @click="alert_plane_func" :show-arrow="false">
        <!--头像-->
        <!--Todo 全局登录状态-->
        <n-space>
            <a-avatar>
                <icon-user/>
            </a-avatar>
        </n-space>
        <!--内容-->
        <!-- Todo 该grid卡片后续将挪动到首页上显示，单独封装成一个组件-->
        <!-- Todo 未登录时将隐藏头像只显示登录注册按钮（单个）-->
        <template #content>
            <a-grid :cols="{ xs: 1, lg: 2, xxl: 3 }" :colGap="24" :rowGap="24">
                <a-grid-item :span="3">
                    登录开启更多功能
                </a-grid-item>

                <a-grid-item>
                    <icon-check-circle-fill/>
                    发布你的文章
                </a-grid-item>
                <a-grid-item>
                    <icon-check-circle-fill/>
                    关注更多频道
                </a-grid-item>
                <a-grid-item>
                    <icon-check-circle-fill/>
                    敬请期待
                </a-grid-item>

                <a-grid-item :span="3">
                    <n-button secondary type="info" block @click="alert_plane_func"> 登录</n-button>
                </a-grid-item>

                <a-grid-item :span="3">
                    没有账号？
                    <a-link @click="alert_plane_func">
                        前往注册
                    </a-link>
                </a-grid-item>
            </a-grid>
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
