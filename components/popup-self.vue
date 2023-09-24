<template>
    <!--个人信息弹框-->
    <a-trigger :mouse-enter-delay="1000" :popup-translate="[0, 10]">
        <!--头像-->
        <!--todo 全局登录状态-->
        <a-avatar>
            <icon-user/>
        </a-avatar>
        <!--内容-->
        <template #content>

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
