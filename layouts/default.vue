<template>
    <!--默认布局-->
    <div>
        <!--主布局，style 自适应屏幕高度-->
        <a-layout style="height: 100vh">
            <!--页首-->
            <default-header></default-header>

            <!--内容最大1000px，居中-->
            <!--embedded 增加背景对于header、卡片等组件的对比度-->
            <n-layout embedded content-style="padding: 24px">
                <div style="max-width: 1200px;margin: auto">
                    <!-- 首页顶部-->
                    <default-nav></default-nav>
                    <n-space justify="center">
                        <div style="margin-top: 10px">
                            <!--页面内容-->
                            <slot/>
                        </div>

                        <!--右侧侧边栏-->
                        <default-right-sidebar></default-right-sidebar>
                    </n-space>
                </div>
            </n-layout>

            <!--页尾-->
            <default-footer></default-footer>

        </a-layout>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {}
    }
}
</script>
<script setup lang="ts">
</script>

<!--<style scoped>-->
<!--.background {-->
<!--    background-color: #F2F3F5;-->
<!--}-->
<!--</style>-->
