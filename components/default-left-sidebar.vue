<template>
    <n-space vertical>

        <!--热门tag-->
        <n-card>
            <n-space>
                <n-tag round checkable v-for="i in 20">tag {{ i }}</n-tag>
            </n-space>
        </n-card>

    </n-space>
</template>

<script lang="ts">

</script>

<style scoped>

</style>
