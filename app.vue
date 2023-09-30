<template>

    <!--预加载遮挡-->
    <div id="onload_plain_id" class="max-cover-box">
        <icon-loading/>
    </div>

    <nuxt-layout>
        <!--页面进度条-->
        <NuxtLoadingIndicator/>

        <!--页面内容-->
        <nuxt-page/>
    </nuxt-layout>

</template>

<script lang="ts">

export default {
    setup() {
    },
    watch: {}
}
</script>

<style>
body {
    overflow: hidden;
}

/*动画*/

.max-cover-box {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: #fff;
    line-height: 100vh;
    text-align: center;
    z-index: 1000000000;
}

</style>
