<template>
    <article-list url="/api/v1/collect/"></article-list>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import ArticleList from 'src/components/article/ArticleList.vue';
export default defineComponent({
    components: {
        ArticleList,
    },
});
</script>

<style scoped></style>
