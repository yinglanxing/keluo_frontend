<template>
    <a-space direction="vertical">

        <!--热门tag-->
        <a-card>
            <a-space wrap>
                <a-tag v-for="i in 20">tag {{ i }}</a-tag>
            </a-space>
        </a-card>

    </a-space>
</template>

<script lang="ts">

</script>

<style scoped>

</style>
