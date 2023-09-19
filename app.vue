<template>

    <nuxt-layout :name="layout">
        <nuxt-page/>
    </nuxt-layout>

</template>

<script lang="ts">
// 后续丢进全局状态中
export default defineComponent({
    data() {
        return {
            layout: "default",
        }
    },
})
</script>
