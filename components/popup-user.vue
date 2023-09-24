<template>
    <!--用户信息弹窗-->
    <!--todo 头像hover弹出详细信息-->
    <a-trigger :mouse-enter-delay="1000" :popup-translate="[0, 10]">
        <!--头像-->
        <!--todo 全局登录状态-->
        <a-avatar>
            <icon-user/>
        </a-avatar>
        <!--内容-->
        <template #content>
            <!--详细用户信息-->
            <a-card>
                详细用户信息
            </a-card>
        </template>
    </a-trigger>

</template>

<script lang="ts">
export default {
    data() {
        return {}
    }
}
</script>

<style scoped>

</style>
