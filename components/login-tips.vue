<template>

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
            <n-button secondary type="info" block> 登录</n-button>
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
