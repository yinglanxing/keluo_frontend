<template>
    <!--默认布局-->
    <div>
        <!--主布局，style 自适应屏幕高度-->
        <a-layout style="height: 100vh">

            <!--页首-->
            <default-header></default-header>

            <!--内容-->
            <!--embedded 增加背景对于header、卡片等组件的对比度-->
            <n-layout embedded content-style="padding: 24px">
                <!--最大1000px，居中-->
                <n-space justify="center">
                    <div style="max-width: 1000px">
                        <slot/>
                    </div>
                </n-space>
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
