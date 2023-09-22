<template>

    <a-grid :cols="{ xs: 1, lg: 2 }" :colGap="24" :rowGap="24">
        <a-grid-item :span="3">
            登录开启更多功能：
        </a-grid-item>

        <a-grid-item>
            <icon-bookmark/>
            更懂你的优质内容
        </a-grid-item>

        <a-grid-item>
            <icon-user-group/>
            更专业的大咖答主
        </a-grid-item>

        <a-grid-item>
            <icon-message/>
            更深度的互动交流
        </a-grid-item>

        <a-grid-item>
            <icon-pen-fill/>
            更高效的创作环境
        </a-grid-item>

        <a-grid-item :span="3">
            <n-button @click="alert_login_plane_func" secondary type="info" block>登录</n-button>
        </a-grid-item>

        <a-grid-item :span="3">
            没有账号？
            <a-link @click="alert_login_plane_func">
                前往注册
            </a-link>
        </a-grid-item>
    </a-grid>
</template>

<script lang="ts">
export default {
    methods: {
        // todo 组件弹窗
        alert_login_plane_func() {
        }
    }
}
</script>

<style scoped>

</style>
