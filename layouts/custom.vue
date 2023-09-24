<template>
    <!--定制布局-->
    <!--主布局，style 自适应屏幕高度-->
    <a-layout style="height: 100vh">
        <!--页首-->
        <default-header></default-header>

        <!--内容-->
        <slot/>
    </a-layout>
</template>

<script lang="ts">
</script>
