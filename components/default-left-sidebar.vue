<template>
    <a-affix :offset-top="5">
        <a-space direction="vertical">

            <!--热门tag-->
            <a-card>
                <a-space wrap>
                    <a-tag v-for="i in 20">#tags {{ i }}</a-tag>
                </a-space>
            </a-card>

        </a-space>
    </a-affix>
</template>

<script lang="ts">

</script>

<style scoped>

</style>
