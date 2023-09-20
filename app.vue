<template>

    <nuxt-layout :name="layout">
        <nuxt-page/>
    </nuxt-layout>

</template>

<script lang="ts">
//todo 后续丢进全局状态中
export default {
    data() {
        return {
            layout: "default",
        }
    },
}
</script>
