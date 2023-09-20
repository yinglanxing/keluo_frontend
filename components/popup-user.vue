<template>
    <!--用户信息弹窗-->
    <!--todo 头像hover弹出详细信息-->
    <a-avatar>

    </a-avatar>

    <a-popover title="Title">
        <!--头像-->
        <!--todo 全局登录状态-->
        <a-avatar>
            <icon-user/>
        </a-avatar>
        <!--内容-->
        <template #content>
            <n-card>
                <!--详细用户信息-->
                详细用户信息
            </n-card>
        </template>
    </a-popover>

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
