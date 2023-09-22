<template>

    <nuxt-layout :name="layout">
        <nuxt-page/>
    </nuxt-layout>

</template>

<script lang="ts">
export default {
    setup() {
        const layout = GLOBAL_LAYOUT()
        return {
            layout,
        }
    },
}
</script>
