<script setup lang="ts">

const route = useRoute()
useHead({
    meta: [{property: 'og:title', content: `App Name - ${route.meta.title}`}]
})
</script>

<template>

</template>

<style scoped>

</style>
