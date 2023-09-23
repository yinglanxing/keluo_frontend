<template>

    <nuxt-layout :name="layout">

        <a-layout-content>

            <!--页面进度条-->
            <NuxtLoadingIndicator/>

            <!--页面内容-->
            <nuxt-page/>
        </a-layout-content>


    </nuxt-layout>

</template>

<script lang="ts">

export default {
    setup() {
        const layout = GLOBAL_LAYOUT()
        return {
            layout,
        }
    }
}
</script>
