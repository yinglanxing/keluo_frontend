<template>
    <!--全屏布局-->
    <div>
        <!--主布局，style 自适应屏幕高度-->
        <a-layout style="height: 100vh">
            <!--页首-->
            <default-header></default-header>

            <!--内容-->
            <slot/>
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
