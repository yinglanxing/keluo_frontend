<template>
    <!--弹窗登录-->

    <a-popover title="Title">
        <!--头像-->
        <!--todo 全局登录状态-->
        <a-avatar>
            <icon-user/>
        </a-avatar>
        <!--内容-->
        <template #content>

        </template>
    </a-popover>

    <!--登录后显示自己-->
    <popup-self></popup-self>

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
