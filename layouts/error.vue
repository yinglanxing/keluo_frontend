<template>
    <div>
        <button @click="handleError">Clear errors</button>
        <slot/>
    </div>
</template>

<script setup>
const props = defineProps({
    error: Object
})

const handleError = () => clearError({redirect: '/'})
</script>
